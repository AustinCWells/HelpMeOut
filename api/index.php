<?php
	
	require '../vendor/autoload.php';
	require 'config.php';

	$app = new \Slim\Slim();

	$app->post('/login', 'login');
	//$app->post('/newaccount', 'createAccount');
	//$app->get('/jobs',  'pullJobs');
	//$app->post('/paymentinfo', 'getPaymentInfo');

	$app->run();

	//This function is used to login the user by finding in the user table where the submitted email and password are. 
	//it then pass the user data in a JSON file.
	// COMPLETE  AND WORKING
	function login()
	{
		$app = \Slim\Slim::getInstance();
		$request = $app->request();
		$loginInfo = json_decode($request->getBody());
		$sql = "SELECT user_id, first_name, last_name, email FROM USER WHERE email = :email AND password = :password";
		try 
		{
			if(isset($loginInfo))
			{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam("email", $loginInfo->email);
				$stmt->bindParam("password", ($loginInfo->password));
				$stmt->execute();
				$userinfo = $stmt->fetch(PDO::FETCH_ASSOC);
				$db = null;
				$response = array('userID' => (int)$userinfo['user_id'], 'firstName' => $userinfo['first_name'], 'lastName' => $userinfo['last_name'], 'email' => $userinfo['email']);
				echo json_encode($response);
			}
			else
				echo '{"error":{"text": "Bad things happend! JSON was not valid" }}'; 		
		} 
		catch(PDOException $e) 
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}

    //Creates an account by inserting a new user into the user table and
	//collecting the needed information
	// COMPLETE BUT NOT TESTED	
	function createAccount()
	{
		$app = \Slim\Slim::getInstance();
		$request = $app->request();
		$newAccount = json_decode($request->getBody());
		$sql = "INSERT INTO USER (`email`, `password`, `first_name`, `last_name`, `phone`, `birth_date`, `gender`)
			VALUES (:email, :password, :first_name, :last_name, :phone, :birth_date, :gender)";
		try 
		{
			if(isset($newAccount))
			{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam("email", $newAccount->email);
				$stmt->bindParam("password", $newAccount->password);
				$stmt->bindParam("first_name", $newAccount->firstname);
				$stmt->bindParam("last_name", md5($newAccount->lastname));
				
				//WE NEED TO DO SOMETHING SOMEWHERE TO ACCOUNT FOR FORMATTING
				//THE DB STORES PHONE # AS 10 DIGITS WITHOUT FORMATTING
				//RESEARCHING THIS TOPIC SAYS THAT'S A GUI ISSUE AND THAT STORING IT AS A VARCHAR LIKE WE ARE DOING IS CORRECT-Wilson
				$stmt->bindParam("phone", $newAccount->number);
				
				$stmt->bindParam("birth_date", $newAccount->bday);
				$stmt->bindParam("gender", $newAccount->gender);
				$stmt->execute();
				$db = null;
			}
			else
				echo '{"error":{"text": "Bad things happend! JSON was not valid" }}'; 		
		} 
		catch(PDOException $e) 
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
		
		$sql = "SELECT user_id, first_name, last_name, email FROM USER WHERE email = :email AND password = :password";
		try 
		{
			if(isset($loginInfo))
			{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam("email", $loginInfo->email);
				$stmt->bindParam("password", md5($loginInfo->password));
				$stmt->execute();
				$userinfo = $stmt->fetch(PDO::FETCH_OBJ);
				$db = null;
				$response['info'] = $userinfo;
				echo json_encode($response);
			}
			else
				echo '{"error":{"text": "Bad things happend! JSON was not valid" }}'; 		
		} 
		catch(PDOException $e) 
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}

	}

	//Pulls the available jobs in the database depending on if user is guest (user_id = 0) or logged in. and then sends them as a JSON file
	function pullJobs()
	{
		$request = \Slim\Slim::getInstance()->request();
		$userObj = json_decode($request->getBody());
		$userID = (int)$userObj->user_id;

		try
		{
			if($userID == 0) //User is not logged in
			{
				$taskList['tasks'] = getJobs();
				echo json_encode($taskList);
			}
			else //user is logged in
			{
				$taskList = getAllJobs($userID);
				echo json_encode($taskList);
			}

		}
		catch(PDOException $e)
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}

	//QUERY's the Database in an effort to get all the jobs that are not complete or in progress 
	//and then passed this as an array back to pulljobs() function.
	function getJobs()
	{
		//MODIFIED QUERY TO ACCOUNT FOR IN-PROGRESS JOBS
		//This query will pull all ACTIVE jobs (not completed, not in progress)
		$sql = "SELECT * FROM CATEGORY c INNER JOIN TASK t ON c.category_id = t.category_id INNER JOIN USER u ON t.beggar_id = u.user_id WHERE t.is_complete = '0' AND t.chooser_id IS NULL";
		try
		{
			$db = getConnection();
			$stmt = $db->query($sql);
			$tasks;
			while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			{
				$taskID = $row['task_id'];
				$tasks[$taskID] = array('category_id' => (int)$row['category_id'], 'title' => $row['title'], 'task_id' => (int)$row['task_id'], 'beggar_id' => (int)$row['beggar_id'], 'chooser_id' => (int)$row['chooser_id'], 'title' => $row['title'], 'description' => $row['description'], 'price' => (int)$row['price'], 'category_id' => (int)$row['category_id'], 'negotiable' => (int)$row['negotiable']);
			}
			$db = null;
			return $tasks;
		}
		catch(PDOException $e)
		{
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}

	//Pulls ALL the jobs in the DB including one's in progress by the user
	//and then passes this as an array back to pulljobs() function.
	function getAllJobs($id)
	{
		$joblist['tasks'] = getJobs();
		$sql = "SELECT * FROM CATEGORY c INNER JOIN TASK t ON c.category_id = t.category_id INNER JOIN USER u ON t.beggar_id = u.user_id WHERE beggar_id = :id";
		$myquery = "SELECT * FROM CATEGORY c INNER JOIN TASK t ON c.category_id = t.category_id INNER JOIN USER u ON t.beggar_id = u.user_id WHERE chooser_id = :id";
		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$tasksRequested = null;
			while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			{
				$taskID = $row['task_id'];
				$tasksRequested[$taskID] = array('category_id' => (int)$row['category_id'], 'title' => $row['title'], 'task_id' => (int)$row['task_id'], 'beggar_id' => (int)$row['beggar_id'], 'chooser_id' => (int)$row['chooser_id'], 'title' => $row['title'], 'description' => $row['description'], 'price' => (int)$row['price'], 'category_id' => (int)$row['category_id'], 'negotiable' => (int)$row['negotiable']);
			}
			$joblist['tasksRequested'] = $tasksRequested;

			$stmt2 = $db->prepare($myquery);
			$stmt2->bindParam("id", $id);
			$stmt2->execute();
			$tasksChosen = null;
			while($row2 = $stmt2->fetch(PDO::FETCH_ASSOC))
			{
				$taskID = $row2['task_id'];
				$tasksChosen[$taskID] = array('category_id' => (int)$row['category_id'], 'title' => $row['title'], 'task_id' => (int)$row['task_id'], 'beggar_id' => (int)$row['beggar_id'], 'chooser_id' => (int)$row['chooser_id'], 'title' => $row['title'], 'description' => $row['description'], 'price' => (int)$row['price'], 'category_id' => (int)$row['category_id'], 'negotiable' => (int)$row['negotiable']);;
			}
			$joblist['tasksChosen'] = $tasksChosen;

			$db = null;

			return $joblist;
		}
		catch(PDOException $e)
		{
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}

	 //Gets all the user's profile information and sends it in a JSON File
   //NOT TESTED BUT BEING WORKED ON
	function getUsersProfile()
	{
	    $request = \Slim\Slim::getInstance()->request();
    	$sql = "Select * from USER WHERE u.user_id = :id";
		
		try
	    {
			$db = getConnection();
			$stmt= $db->query($sql);
		    $userinfo = $stmt->fetch(PDO::FETCH_ASSOC); //I'm not 100% sure about this line but I'm using login as a guide for this
			$db = null;
			$userProfile = array('userID' => (int)$userinfo['user_id'], 'firstName' => $userinfo['first_name'], 'lastName' => $userinfo['last_name'], 'email' => $userinfo['email'], 'phone' => $userinfo['phone']);
			echo json_encode($userProfile);
		}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}

	//Pulls all the info on the Job for a detailed report
	//THE SQL COMMAND IS DONE WHICH IS WHAT NEEDED TO BE DONE FOR THIS ITERATION!! YAY PHRASING
	//I went ahead and attempted to make the json object of stuff we need, just getting ahead on my work don't judge
	function getJobInfo()
     {
	   $request = \Slim\Slim::getInstance()->request();
		$sql = "SELECT task.task_id, task.beggar_id, task.chooser_id, task.short_description, task.notes, task.price, task.negotiable, task.bid_id, task.time_frame_date, task.time_frame_time
                FROM `task` WHERE task.task_id = :id";			
      	 
		try
	      {
			$db = getConnection();
			$stmt= $db->query($sql);
			$userinfo = $stmt->fetch(PDO::FETCH_ASSOC); //I'm not 100% sure about this line but I'm using login as a guide for this
			$db = null;
			$jobInfo = array('task_id' => (int)$jobInfo ['task_id'], 'beggar_id' => $jobInfo['beggar_id'], 'chooser_id' => $jobInfo['chooser_id'], 'short_description' => $jobInfo['short_description'], 'notes' => $jobInfo['notes'], 'price' => $jobInfo['price'], 'negotiable' => $jobInfo['negotiable'], 'bid_id' => $jobInfo['bid_id'], 'time_frame_date' => $jobInfo['time_frame_date'], 'time_frame_time' => $jobInfo['time_frame_time']);
		   echo json_encode($jobInfo);
		   
	      }  
		catch(PDOException $e) 
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
		
	}
/*
	function getUserBadges()
	{
	     $request = \Slim\Slim::getInstance()->request();
		$sql = "SELECT u.first_name, u.last_name, b.title, b.description FROM BADGES b INNER JOIN BADGES_EARNED be ON be.badge_id = b.badge_id INNER JOIN USER u ON u.user_id = be.user_id WHERE u.user_id = :id";
	}

	// NOT TESTED, BUT FUNCTIONAL
	function getPaymentInfo()
	{
		$request = \Slim\Slim::getInstance()->request();
		$userID = json_decode($request->getBody());
		$sql = "SELECT given_name, surname, email, phone_no, credit_type, credit_no FROM Users WHERE user_id = :id";
		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $userID->user_id);
			$stmt->execute();
			$userInfo = $stmt->fetch(PDO::FETCH_OBJ);
			$db = null;
			$response['info'] = $userInfo;
			echo json_encode($response);
		}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}

*/

	// COMPLETE gets the connection 
	function getConnection() 
	{
		$dbhost="127.0.0.1";
		$dbuser="root";
		$dbname=dbname;
		$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, dbpass);	
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $dbh;
	}

?>