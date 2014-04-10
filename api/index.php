<?php
	
	require '../vendor/autoload.php';
	require 'config.php';
	require 'index2.php';

	$app = new \Slim\Slim();

	$app->post('/login', 'login');
	$app->post('/newaccount', 'createAccount');
	$app->get('/useraccount/:id', 'getUserAccount');
	$app->get('/jobs',  'pullJobs');
	$app->get('/jobsImDoing', 'getJobsImDoing');
	$app->get('/jobsINeedDone', 'getsJobsINeedCompleted');
	$app->post('/postatask', 'postTask');
	$app->get('/recentTasks/', 'recentTasks');
	$app->get('/addTokens/:user_id/:new_tokens', 'addTokens');
	//$app->post('/paymentinfo', 'getPaymentInfo');

	$app->run();


	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/10
	#	SUMMARY:		This function is used to login the user.
	#	INPUTS:			JSON(email, password)
	#	OUTPUTS:		JSON(userID, firstName, lastName, email)
	#	STATUS:			Working
	##########
	function login()
	{
		$app = \Slim\Slim::getInstance();
		$request = $app->request();
		$loginInfo = json_decode($request->getBody());
		$sql = "SELECT user_id, first_name, last_name, email, tokens FROM USER WHERE email = :email AND password = :password";
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
				$response = array('userID' => (int)$userinfo['user_id'], 'firstName' => $userinfo['first_name'], 'lastName' => $userinfo['last_name'], 'email' => $userinfo['email'], 'tokens' => $userinfo['tokens']);
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


	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/10
	#	SUMMARY:		Creates a new user in the database and automagically logs them in to the HelpMeOut site.
	#	INPUTS:			JSON(email, password, firstName, lastName, phone, birthDate, gender)	
	#	OUTPUTS:		JSON(userID, firstName, lastName, email)
	#	STATUS:			Working
    ##########
	function createAccount()
	{
		$app = \Slim\Slim::getInstance();
		$request = $app->request();
		$newAccount = json_decode($request->getBody());
		$sql = "INSERT INTO USER (`email`, `password`, `first_name`, `last_name`, `phone`, `birth_date`, `gender`, `tokens`)
			VALUES (:email, :password, :first_name, :last_name, :phone, :birth_date, :gender, 10)";
		try 
		{
			if(isset($newAccount))
			{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam("email", $newAccount->email);
				$stmt->bindParam("password", $newAccount->password);
				$stmt->bindParam("first_name", $newAccount->firstName);
				$stmt->bindParam("last_name", $newAccount->lastName);
				
				//WE NEED TO DO SOMETHING SOMEWHERE TO ACCOUNT FOR FORMATTING
				//THE DB STORES PHONE # AS 10 DIGITS WITHOUT FORMATTING
				//RESEARCHING THIS TOPIC SAYS THAT'S A GUI ISSUE AND THAT STORING IT AS A VARCHAR LIKE WE ARE DOING IS CORRECT-Wilson
				$stmt->bindParam("phone", $newAccount->number);
				
				$stmt->bindParam("birth_date", $newAccount->birthDate);
				$stmt->bindParam("gender", $newAccount->gender);
				//$stmt->bindParam("tokens", 10);
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
		
		$sql = "SELECT user_id, first_name, last_name, email, tokens FROM USER WHERE email = :email AND password = :password";
		try 
		{
			if(isset($newAccount))
			{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam("email", $newAccount->email);
				$stmt->bindParam("password", $newAccount->password/*md5($loginInfo->password)*/);
				$stmt->execute();
				$userinfo = $stmt->fetch(PDO::FETCH_ASSOC);
				$db = null;
				$response = array('userID' => (int)$userinfo['user_id'], 'firstName' => $userinfo['first_name'], 'lastName' => $userinfo['last_name'], 'email' => $userinfo['email'], 'tokens' => $userinfo['tokens']);
				echo json_encode($response);
			}
			else
				echo '{"error":{"text": "Bad things happend! JSON was not valid 2" }}'; 		
		} 
		catch(PDOException $e) 
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}

	}

	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/10
	#	SUMMARY:		This function retrieves the current user's account information 
	#					for when they want to view their personal info
	#	INPUTS:			JSON(user_id)	
	#	OUTPUTS:		JSON(userID, email, first_name, last_name, phone, birth_date, gender, times_reported, tokens)
	#	STATUS:			WORKING
    ##########
    function getUserAccount($id)
    {
    	//use $id for testing, $userID for actual implementation
    	$sql = "SELECT * FROM USER WHERE user_id = :id";
    	$request = \Slim\Slim::getInstance()->request();
		$userObj = json_decode($request->getBody());
		//$userID = (int)$userObj->user_id;

		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $id); //un-comment above and use $userID instead of $id here for implementation on site
			$stmt->execute();
			$userInfo = $stmt->fetch(PDO::FETCH_ASSOC);
			$db = null;
			$response = array('userID' => $userInfo['user_id'], 
							  'email' => $userInfo['email'], 
							  'first_name' => $userInfo['first_name'], 
							  'last_name' => $userInfo['last_name'], 
							  'phone' => $userInfo['phone'], 
							  'birth_date' => $userInfo['birth_date'], 
							  'gender' => $userInfo['gender'], 
							  'times_reported' => $userInfo['times_reported'], 
							  'tokens' => $userInfo['tokens']);
			echo json_encode($response);
		}
		catch(PDOException $e)
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
    }


	##########
	#	AUTHOR:			?
	#	LAST UPDATE:	?
	#	SUMMARY:		?	
	#	INPUTS:			?	
	#	OUTPUTS:		?
	#	STATUS:			?
    ##########
	function pullJobs()
	{
		$request = \Slim\Slim::getInstance()->request();
		$userObj = json_decode($request->getBody());
		//$userID = (int)$userObj->user_id;

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

	
	##########
	#	AUTHOR:			?
	#	LAST UPDATE:	?
	#	SUMMARY:		QUERY's the Database in an effort to get all the jobs that are not complete or in progress and then passed this as an array back to pulljobs() function.
	#					MODIFIED QUERY TO ACCOUNT FOR IN-PROGRESS JOBS
	#					This query will pull all ACTIVE jobs (not completed, not in progress)
	#	INPUTS:			?	
	#	OUTPUTS:		?
	#	STATUS:			?
    ##########
	function getJobs()
	{
		$sql = "SELECT * FROM CATEGORY c INNER JOIN TASK t ON c.category_id = t.category_id INNER JOIN USER u ON t.beggar_id = u.user_id WHERE t.is_complete = '0' AND t.chooser_id IS NULL";
		try
		{
			$db = getConnection();
			$stmt = $db->query($sql);
			$tasks;
			while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			{
				$taskID = $row['task_id'];
				$tasks[$taskID] = array('category_id' => (int)$row['category_id'], 'task_id' => (int)$row['task_id'], 'beggar_id' => (int)$row['beggar_id'], 'short_description' => $row['short_description'], 'price' => (int)$row['price'], 'category_id' => (int)$row['category_id'], 'negotiable' => (int)$row['negotiable'], 'is_complete' => (int)$row['is_complete']);
			}
			$db = null;
			return $tasks;
		}
		catch(PDOException $e)
		{
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}

	
	##########
	#	AUTHOR:			?
	#	LAST UPDATE:	?
	#	SUMMARY:		Pulls ALL the jobs in the DB including one's in progress by the user and then passes this as an array back to pulljobs() function.
	#	INPUTS:			?	
	#	OUTPUTS:		?
	#	STATUS:			?
    ##########
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
	
	##########
	#	AUTHOR:			?
	#	LAST UPDATE:	?
	#	SUMMARY:		Pulls all the info on the Job for a detailed report
	#					- THE SQL COMMAND IS DONE WHICH IS WHAT NEEDED TO BE DONE FOR THIS ITERATION!! YAY PHRASING
	#					- I went ahead and attempted to make the json object of stuff we need, just getting ahead on my work don't judge
	#	INPUTS:			?	
	#	OUTPUTS:		?
	#	STATUS:			?
    ##########
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


	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/9
	#	SUMMARY:		This takes the form data for posting a job and inserts it into the database
	#	INPUTS:			JSON(beggar_id, category_id, short_description, price, location, time_frame_date, time_frame_time, notes)
	#	OUTPUTS:		None
	#	STATUS:			Working
    ##########
	function postTask()
	{
		$request = \Slim\Slim::getInstance()->request();
		$taskInfo = json_decode($request->getBody());
		$sql = "INSERT INTO TASK (`beggar_id`, `category_id`, `short_description`, `price`, `location`, `time_frame_date`, `time_frame_time`, `notes`) VALUES (:beggar_id, :category_id, :short_description, :price, :location, :time_frame_date, :time_frame_time, :notes)";

		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("beggar_id", $taskInfo->userID);
			$stmt->bindParam("category_id", $taskInfo->category);
			$stmt->bindParam("short_description", $taskInfo->description);
			$stmt->bindParam("price", $taskInfo->price);
			$stmt->bindParam("location", $taskInfo->location);
			$stmt->bindParam("time_frame_date", $taskInfo->deadlineDate);
			$stmt->bindParam("time_frame_time", $taskInfo->deadlineTime);
			$stmt->bindParam("notes", $taskInfo->notes);
			$stmt->execute();
			$db = null;
		}
		catch(PDOException $e)
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}


	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/9
	#	SUMMARY:		Retrieves all jobs the current user is in the process of doing.
	#	INPUTS:			JSON(user_id)
	#	OUTPUTS:		JSON(beggar_id, chooser_id, short_description, notes, price, category_id, negotiable, time_frame_date, time_frame_time, location)
	#	STATUS:			Working
    ##########
	function getJobsImDoing()
	{
	$request = \Slim\Slim::getInstance()->request();
	$userInfo = json_decode($request->getBody());
	$sql= "SELECT * FROM TASK WHERE chooser_id = :id AND is_complete = 0";
	try
	      {
			$db = getConnection();
			$stmt= $db->prepare($sql);
			$stmt->bindParam("id", $userInfo->user_id);
			$stmt->execute();
			$jobsImDoing = null;
			while($row = $stmt->fetch(PDO::FETCH_ASSOC)) //I'm not 100% sure about this line but I'm using login as a guide for this
			{
				$taskID = $row['task_id'];
				$jobsImDoing[$taskID] = array('beggar_id' => (int)$row['beggar_id'], 
											  'chooser_id' => (int)$row['chooser_id'], 
											  'short_description' => $row['short_description'], 
											  'notes' => $row['notes'], 
											  'price' => (int)$row['price'], 
											  'category_id' => (int)$row['category_id'], 
											  'negotiable' => (int)$row['negotiable'], 
											  'time_frame_date' => $row['time_frame_date'], 
											  'time_frame_time' => $row['time_frame_time'], 
											  'location' => $row['location']);
			}
			$db = null;
		   	echo json_encode($jobsImDoing);
		   
	      }  
		catch(PDOException $e) 
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}
	

	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/9
	#	SUMMARY:		Gets all jobs the current user has asked for help with.
	#	INPUTS:			JSON(user_id)
	#	OUTPUTS:		JSON(beggar_id, chooser_id, short_description, notes, price, category_id, negotiable, time_frame_date, time_frame_time, location)
	#	STATUS:			Working
    ##########
	function getsJobsINeedCompleted()
	{
	$request = \Slim\Slim::getInstance()->request();
	$userInfo = json_decode($request->getBody());
	$sql= "SELECT * FROM TASK WHERE beggar_id = :id AND is_complete = 0";
	try
	      {
			$db = getConnection();
			$stmt= $db->prepare($sql);
			$stmt->bindParam("id", $userInfo->user_id);
			$stmt->execute();
			$jobsINeedDone = null;
			while($row = $stmt->fetch(PDO::FETCH_ASSOC)) //I'm not 100% sure about this line but I'm using login as a guide for this
			{
				$taskID = $row['task_id'];
				$jobsINeedDone[$taskID] = array('beggar_id' => (int)$row['beggar_id'], 
											  'chooser_id' => (int)$row['chooser_id'], 
											  'short_description' => $row['short_description'], 
											  'notes' => $row['notes'], 
											  'price' => (int)$row['price'], 
											  'category_id' => (int)$row['category_id'], 
											  'negotiable' => (int)$row['negotiable'], 
											  'time_frame_date' => $row['time_frame_date'], 
											  'time_frame_time' => $row['time_frame_time'], 
											  'location' => $row['location']);
			}
			$db = null;
		   	echo json_encode($jobsINeedDone);
		   
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