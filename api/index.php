<?php
	
	require '../vendor/autoload.php';
	require 'config.php';
	require 'index2.php';

	$app = new \Slim\Slim();

	$app->post('/login', 'login');
	$app->post('/newaccount', 'createAccount');
	$app->post('/updateaccount', 'updateAccount');
	$app->post('/updatepassword', 'updatePassword');
	$app->post('/useraccount', 'getUserAccount');
	$app->get('/tasks', 'pullTasks');
	$app->post('/tasksImDoing', 'getTasksImDoing');
	$app->post('/tasksINeedDone', 'getTasksINeedCompleted');
	$app->post('/postatask', 'postTask');
	$app->get('/recentTasks/:numTasks', 'recentTasks');
	$app->post('/addTokens', 'addTokens');
	$app->get('/changeProfileImage', 'changeProfileImage');
	$app->get('/getOffers/:user_id', 'getOffers');
	$app->post('/makeOffer', 'makeOffer');
	$app->get('/getMyTasksAndPendingOffers/:user_id', 'getMyTasksAndPendingOffers');
	$app->get('/declineOffer/:user_id,:task_id', 'declineOffer');
	$app->get('/acceptOffer/:user_id,:task_id', 'acceptOffer');

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
		$sql = "SELECT user_id, first_name, last_name, email, tokens, phone, is_custom, custom_image_path FROM USER WHERE email = :email AND password = :password";
		try 
		{
			if(isset($loginInfo))
			{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam("email", $loginInfo->email);
				$stmt->bindParam("password", md5($loginInfo->password));
				$stmt->execute();
				$userinfo = $stmt->fetch(PDO::FETCH_ASSOC);
				$db = null;
				$response = array('userID' => (int)$userinfo['user_id'], 'firstName' => $userinfo['first_name'], 'lastName' => $userinfo['last_name'], 'email' => $userinfo['email'], 'tokens' => (int)$userinfo['tokens'], 'phone' => $userinfo['phone'], 'is_custom' => $userinfo['is_custom'], 'custom_image_path' => $userinfo['custom_image_path']);
				echo json_encode($response);
			}
			else
				echo '{"error":{"text": "Login Info was not set" }}'; 		
		} 
		catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
		}
	}


	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/18 - Added info to return profile image info (SK)
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
				$stmt->bindParam("password", md5($newAccount->password));
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
				echo '{"error":{"text": "New Account can not be set because not set."}}';
		}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
		}
		
		$sql = "SELECT user_id, first_name, last_name, email, tokens, is_custom, custom_image_path FROM USER WHERE email = :email AND password = :password";
		try 
		{
			if(isset($newAccount))
			{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam("email", $newAccount->email);
				$stmt->bindParam("password", md5($newAccount->password));
				$stmt->execute();
				$userinfo = $stmt->fetch(PDO::FETCH_ASSOC);
				$db = null;
				$response = array('userID' => (int)$userinfo['user_id'], 'firstName' => $userinfo['first_name'], 'lastName' => $userinfo['last_name'], 'email' => $userinfo['email'], 'tokens' => (int)$userinfo['tokens'], 'is_custom' => $userinfo['is_custom'], 'custom_image_path' => $userinfo['custom_image_path']);
				echo json_encode($response);
			}
			else
				echo '{"error":{"text": "New Account not set!"}}';
		} 
		catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
		}

	}

	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/18 - Added info to return profile image info (SK)
	#	SUMMARY:		updates the user account with new information sent from the user
	#	INPUTS:			JSON(user_id, firstName, lastName, email, number)	
	#	OUTPUTS:		JSON(success)
	#	STATUS:			NOT
    ##########
	function updateAccount()
	{
		$sql = "UPDATE USER SET first_name = :first_name, last_name = :last_name, phone = :phone, email = :email WHERE user_id = :user_id";
		$request = \Slim\Slim::getInstance()->request();
		$userInfo = json_decode($request->getBody());

		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("first_name", $userInfo->firstName);
			$stmt->bindParam("last_name", $userInfo->lastName);
			$stmt->bindParam("phone", $userInfo->number);
			$stmt->bindParam("email", $userInfo->email);
			$stmt->bindParam("user_id", $userInfo->userID);
			$stmt->execute();
			$db = null;
			echo '{"success": true}';
		}
		catch(PDOException $e)
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
		}
	}

	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/18
	#	SUMMARY:		This function update's the current user's password
	#	INPUTS:			JSON(user_id, password)	
	#	OUTPUTS:		JSON(success)
	#	STATUS:			NOT TESTED
    ##########
	function updatePassword()
	{
		$sql = "UPDATE USER SET password = :password WHERE user_id = :user_id";
		$request = \Slim\Slim::getInstance()->request();
		$userInfo = json_decode($request->getBody());

		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("password", md5($userInfo->password));
			$stmt->bindParam("user_id", $userInfo->userID);
			$stmt->execute();
			$db = null;
			echo '{"success": true}';
		}
		catch(PDOException $e)
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
		}
	}

	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/18 - Added info to return profile image info (SK)
	#	SUMMARY:		This function retrieves the current user's account information 
	#					for when they want to view their personal info
	#	INPUTS:			JSON(user_id)	
	#	OUTPUTS:		JSON(userID, email, first_name, last_name, phone, birth_date, gender, times_reported, tokens)
	#	STATUS:			WORKING
    ##########
    function getUserAccount()
    {
    	//use $id for testing, $userID for actual implementation
    	$sql = "SELECT * FROM USER WHERE user_id = :id";
    	$request = \Slim\Slim::getInstance()->request();
		$userObj = json_decode($request->getBody());
		$userID = (int)$userObj->user_id;

		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $userID); //un-comment above and use $userID instead of $id here for implementation on site
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
							  'tokens' => (int)$userInfo['tokens'],
							  'is_custom' => $userInfo['is_custom'],
							  'custom_image_path' => $userInfo['custom_image_path']);
			echo json_encode($response);
		}
		catch(PDOException $e)
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
		}
    }


	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/18
	#	SUMMARY:		Gets all Jobs (grouped by category) from the DB that have not been completed
	#	INPUTS:			None	
	#	OUTPUTS:		JSON(category: {taskID: {first_name, last_name, short_description, notes, price, time_frame_date, time_frame_time, location}})
	#	STATUS:			NOT TESTED
    ##########
	function pullTasks()
	{
		$sql = "SELECT title AS category, t1.* FROM CATEGORY INNER JOIN (SELECT USER.first_name, USER.last_name, TASK.task_id, TASK.category_id, TASK.short_description, TASK.notes, TASK.price, TASK.time_frame_date, TASK.time_frame_time, TASK.location FROM USER INNER JOIN TASK ON USER.user_id = TASK.beggar_id AND is_complete = 0) AS t1 ON CATEGORY.category_id = t1.category_id";
		#	Define arrays for all job categories:
		$food = array();
		$rides = array();
		$groceryRun = array();
		$cleaning = array();
		$laundry = array();
		$maintenance = array();
		$techSupport = array();
		$other = array();
		#	Define array for main jobs array:
		$tasks;

		try
		{
			$db = getConnection();
			$stmt = $db->query($sql);

			while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			{
				$category = $row['category'];
				$tempObject = array('task_id' => (int)$row['task_id'],
									'first_name' => $row['first_name'],
									'last_name' => $row['last_name'],
									'short_description' => $row['short_description'],
									'notes' => $row['notes'],
									'price' => (int)$row['price'],
									'time_frame_date' => $row['time_frame_date'],
									'time_frame_time' => $row['time_frame_time'],
									'location' => $row['location']);

				switch($category)
				{
					case "Food Delivery":
						array_push($food, $tempObject);
						break;
					case "Rides":
						array_push($rides, $tempObject);
						break;
					case "Grocery Run":
						array_push($groceryRun, $tempObject);
						break;
					case "Cleaning":
						array_push($cleaning, $tempObject);
						break;
					case "Laundry":
						array_push($laundry, $tempObject);
						break;
					case "Maintenance":
						array_push($maintenance, $tempObject);
						break;
					case "Tech Support":
						array_push($techSupport, $tempObject);
						break;
					case "Other":
						array_push($other, $tempObject);
						break;
				}
			}

			$db = null;
			$tasks['food'] = $food;
			$tasks['rides'] = $rides;
			$tasks['groceries'] = $groceryRun;
			$tasks['cleaning'] = $cleaning;
			$tasks['laundry'] = $laundry;
			$tasks['maintenance'] = $maintenance;
			$tasks['techSupport'] = $techSupport;
			$tasks['other'] = $other;

			echo json_encode($tasks);
		}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
		}
	}
	
	##########
	#	AUTHOR:			Wilson
	#	LAST UPDATE:	A while ago
	#	SUMMARY:		Pulls all the info on the Job for a detailed report
	#                   - This is meant for homepage when you click on the job to get more detail
	#					- This pulls info for the job, right now it's all the info because I'm not sure what Chris wants
	#					-If anyone uses this feel free to change it just tell me what ya did. 
	#	INPUTS:			?	
	#	OUTPUTS:		?
	#	STATUS:			Waiting for gui guys to start function on so I can pass the right stuff
    ##########
	function getTaskInfo()
     {
	   $request = \Slim\Slim::getInstance()->request();
		$sql = "SELECT task.task_id, task.beggar_id, task.chooser_id, task.short_description, task.notes, task.price, task.negotiable, task.bid_id, task.time_frame_date, task.time_frame_time
                FROM `task` WHERE task.task_id = :id";			
      	 
		try
	      {
			$db = getConnection();
			$stmt= $db->query($sql);
			$userinfo = $stmt->fetch(PDO::FETCH_ASSOC); //I'm not 100% sure about this line but I'm using login as a guide for this
			$stmt->execute();
			$jobsInfo = null;
			$jobInfo = array('task_id' => (int)$jobInfo ['task_id'], 
							 'beggar_id' => $jobInfo['beggar_id'], 
							 'chooser_id' => $jobInfo['chooser_id'], 
							 'short_description' => $jobInfo['short_description'],
							 'notes' => $jobInfo['notes'],
							 'price' => $jobInfo['price'], 
							 'negotiable' => $jobInfo['negotiable'],
							 'bid_id' => $jobInfo['bid_id'], 
							 'time_frame_date' => $jobInfo['time_frame_date'], 
							 'time_frame_time' => $jobInfo['time_frame_time']);
		   $db = null;
		   echo json_encode($jobInfo);
	      }  
		catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
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
		$success = array('success'=>true);
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
			echo json_encode($success);
			
		}
		catch(PDOException $e)
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
		}
	}


	##########
	#	AUTHOR:			Charlie/Wilson
	#	LAST UPDATE:	4/21 - Modified while loop to include additional parameters (SK)
	#	SUMMARY:		Retrieves all jobs the current user is in the process of doing.
	#	INPUTS:			JSON(user_id)
	#	OUTPUTS:		JSON(beggar_id, chooser_id, short_description, notes, price, category_id, negotiable, time_frame_date, time_frame_time, location)
	#	STATUS:			Not Working- Object passing Null Values even though Jordan is sending us a "user_id"
    ##########
	function getTasksImDoing()
	{
	$tasksImDoing = array();
	$request = \Slim\Slim::getInstance()->request();
	$userInfo = json_decode($request->getBody());

	$sql= "SELECT * FROM TASK INNER JOIN USER ON TASK.beggar_id = USER.user_id WHERE chooser_id = :id AND is_complete = 0";
	try
	      {
			$db = getConnection();
			$stmt= $db->prepare($sql);
			$stmt->bindParam("id", $userInfo->user_id, PDO::PARAM_INT);
			$stmt->execute();
			while($row = $stmt->fetch(PDO::FETCH_ASSOC)) //I'm not 100% sure about this line but I'm using login as a guide for this
			{
				$taskInfo = array('task_id' => (int)$row['task_id'], 
									 		'beggar_id' => (int)$row['beggar_id'], 
										   	'beggar_fName' => $row['first_name'], 
										   	'beggar_lName' => $row['last_name'], 
										   	'contact_number' => $row['phone'],
										   	'contact_email' => $row['email'],
										   	'chooser_id' => (int)$row['chooser_id'], 
											'short_description' => $row['short_description'], 
											'notes' => $row['notes'], 
											'price' => (int)$row['price'], 
											'location' => $row['location'],
											'category_id' => (int)$row['category_id'], 
											'negotiable' => (int)$row['negotiable'], 
											'time_frame_date' => $row['time_frame_date'], 
											'time_frame_time' => $row['time_frame_time']);
				array_push($tasksImDoing, $taskInfo);
			}
			$db = null;
		   	echo json_encode($tasksImDoing);
		   
	      }  
		catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
		}
	}
	

	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/9
	#	SUMMARY:		Gets all jobs the current user has asked for help with.
	#	INPUTS:			JSON(user_id)
	#	OUTPUTS:		JSON(beggar_id, chooser_id, short_description, notes, price, category_id, negotiable, time_frame_date, time_frame_time, location)
	#	STATUS:			Not Working- Object passing Null Values even though Jordan is sending us a "user_id"
    ##########
	function getTasksINeedCompleted()
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
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
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
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 		} 
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