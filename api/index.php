<?php
	
	require '../vendor/autoload.php';
	require 'config.php';
	require 'index2.php';

	$app = new \Slim\Slim();

#index.php - Updated 4/29 (SK)
	$app->post('/login', 'login');
	$app->post('/newaccount', 'createAccount');
	$app->post('/updateaccount', 'updateAccount');
	$app->post('/updatepassword', 'updatePassword');
	$app->post('/useraccount', 'getUserAccount');
	$app->post('/tasks', 'pullTasks');
	//$app->get('/tasks', 'pullTasks');
	#getTaskInfo() --- Pending Deletion
	$app->post('/postatask', 'postTask');
	$app->post('/tasksImDoing', 'getTasksImDoing');
	$app->post('/tasksINeedDone', 'getTasksINeedCompleted');
	#getUserBadges() --- Pending Deletion
	#getConnection() --- Used by functions to connect to DB

#index2.php - Updated 4/29 (SK)
	//$app->get('/recentTasks/:numTasks', 'recentTasks');
	$app->post('/recentTasks', 'recentTasks');
	$app->post('/addTokens', 'addTokens');
	$app->post('/changeProfileImage', 'changeProfileImage');
	$app->post('/uploadProfileImage', 'uploadProfileImage');
	$app->get('/getOffers/:user_id', 'getOffers');
	$app->post('/makeOffer', 'makeOffer');
	$app->get('/getMyTasksAndPendingOffers/:user_id', 'getMyTasksAndPendingOffers');
	$app->get('/declineOffer/:user_id,:task_id', 'declineOffer');
	$app->get('/acceptOffer/:user_id,:task_id', 'acceptOffer');
	$app->get('/completeTask/:task_id,:num_stars_speed,:num_stars_reliability', 'completeTask');
	$app->get('/cancelTask/:user_id,:task_id', 'cancelTask');

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
				$response = array('userID' => (int)$userinfo['user_id'], 'firstName' => $userinfo['first_name'], 'lastName' => $userinfo['last_name'], 'email' => $userinfo['email'], 'tokens' => (int)$userinfo['tokens'], 'phone' => $userinfo['phone'], 'is_custom' => (int)$userinfo['is_custom'], 'custom_image_path' => $userinfo['custom_image_path']);
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
	#	LAST UPDATE:	4/18/14 - Added info to return profile image info (SK)
	#					4/29/14 - Corrected issue where users could sign up multiple times with the same email address (SK/CA/WW)
	#	SUMMARY:		Creates a new user in the database and automagically logs them in to the HelpMeOut site.
	#	INPUTS:			JSON(email, password, firstName, lastName, phone, birthDate, gender)	
	#	OUTPUTS:		JSON(userID, firstName, lastName, email)
	#	STATUS:			COMPLETE
    ##########
	function createAccount()
	{
		$app = \Slim\Slim::getInstance();
		$request = $app->request();
		$newAccount = json_decode($request->getBody());
		$account_exists = FALSE;
		

		$sqlTest = "SELECT user_id FROM USER WHERE email = :email";
		try
		{
			$db = getConnection();
			$stmtTest = $db->prepare($sqlTest);
			$stmtTest->bindParam("email", $newAccount->email);
			$stmtTest->execute();
		   	$account_check = $stmtTest->fetch(PDO::FETCH_ASSOC);
			
			if(empty($account_check))
				$account_exists = FALSE;
			else
				$account_exists = TRUE;
			
			$db = null;
		}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
		}

		
		if($account_exists == FALSE)
		{
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
		
			$sql = "SELECT user_id, first_name, last_name, email, phone, tokens, is_custom, custom_image_path FROM USER WHERE email = :email AND password = :password";
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
					$response = array('userID' => (int)$userinfo['user_id'], 'firstName' => $userinfo['first_name'], 'lastName' => $userinfo['last_name'], 'email' => $userinfo['email'], 'phone' => $userinfo['phone'], 'tokens' => (int)$userinfo['tokens'],'is_custom' => (int)$userinfo['is_custom'], 'custom_image_path' => $userinfo['custom_image_path']);
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
		else
			echo '{"error":{"text": "An account with that email address already exists!"}}';
	}

	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/18 - Added info to return profile image info (SK)
	#	SUMMARY:		updates the user account with new information sent from the user
	#	INPUTS:			JSON(user_id, firstName, lastName, email, number)	
	#	OUTPUTS:		JSON(success)
	#	STATUS:			COMPLETE
    ##########
	function updateAccount()
	{
		$request = \Slim\Slim::getInstance()->request();
		$userInfo = json_decode($request->getBody());
		$correct_info = FALSE;


		$sql = "SELECT first_name FROM USER WHERE user_id = :user_id AND password = :password";
		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("user_id", $userInfo->user_id);
			$stmt->bindParam("password", md5($userInfo->password));
			$stmt->execute();
			$db = null;

			$info = $stmt->fetch(PDO::FETCH_ASSOC);

			if(empty($info))
				$correct_info = FALSE;
			else
				$correct_info = TRUE;			
		}
		catch(PDOException $e)
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
		}


		if($correct_info == TRUE)
		{
			$sql = "UPDATE USER SET first_name = :first_name, last_name = :last_name, phone = :phone, email = :email WHERE user_id = :user_id AND password = :password";
			try
			{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam("first_name", $userInfo->first_name);
				$stmt->bindParam("last_name", $userInfo->last_name);
				$stmt->bindParam("phone", $userInfo->phone);
				$stmt->bindParam("email", $userInfo->email);
				$stmt->bindParam("user_id", $userInfo->user_id);
				$stmt->bindParam("password", md5($userInfo->password));
				$stmt->execute();
				$db = null;
				echo '{"success": true}';
			}
			catch(PDOException $e)
			{
				echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
			}
		}
		else
			echo '{"error":{"text": "Incorrect Password: Account info was not updated" }}'; 
	}

	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/18
	#	SUMMARY:		This function update's the current user's password
	#	INPUTS:			JSON(user_id, password)	
	#	OUTPUTS:		JSON(success)
	#	STATUS:			COMPLETE
    ##########
	function updatePassword()
	{
		$sql = "UPDATE USER SET password = :password WHERE user_id = :user_id AND password = :old_password";
		$request = \Slim\Slim::getInstance()->request();
		$userInfo = json_decode($request->getBody());

		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("password", md5($userInfo->password));
			$stmt->bindParam("user_id", $userInfo->userID);
			$stmt->bindParam("old_password", md5($userInfo->old_password));
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
	#	LAST UPDATE:	4/18/14 - Added info to return profile image info (SK)
	#					4/30/14 – Massive overhaul to calculate badge tiers and return info about which badges users have unlocked (SK)
	#	SUMMARY:		This function retrieves the current user's account information 
	#					for when they want to view their personal info
	#	INPUTS:			JSON(user_id)	
	#	OUTPUTS:		JSON(userID, email, first_name, last_name, phone, birth_date, gender, times_reported, tokens)
	#	STATUS:			COMPLETE
    ##########
    function getUserAccount()
    {
    	//use $id for testing, $user_id for actual implementation
    	$sql = "SELECT * FROM (SELECT USER.*, USER_DATA.jobs_completed, USER_DATA.jobs_requested, USER_DATA.speed, USER_DATA.reliability FROM USER INNER JOIN USER_DATA ON USER.user_id = USER_DATA.user_id) AS t1 WHERE t1.user_id = :id";
    	$request = \Slim\Slim::getInstance()->request();
		$userObj = json_decode($request->getBody());
		$user_id = (int)$userObj->user_id;

		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $user_id); //un-comment above and use $user_id instead of $id here for implementation on site
			$stmt->execute();
			$userInfo = $stmt->fetch(PDO::FETCH_ASSOC);
			$db = null;


			$num_completions = (int)$userInfo['jobs_completed'];
			$num_requests = (int)$userInfo['jobs_requested'];
			$num_night_tasks;


			$completions_tier = 0;
			$requests_tier = 0;
			$night_owl_tier = 0;


			#COMPLETIONS_TIER			
			if($num_completions > 0)
				$completions_tier = 1;
			if($num_completions >= 25)
				$completions_tier = 2;
			if($num_completions >= 50)
				$completions_tier = 3;
			if($num_completions >= 100)
				$completions_tier = 4;


			#REQUESTS_TIER
			if($num_requests > 0)
				$requests_tier = 1;
			if($num_requests >= 25)
				$requests_tier = 2;
			if($num_requests >= 50)
				$requests_tier = 3;
			if($num_requests >= 100)
				$requests_tier = 4;


			$sql = "SELECT COUNT(night_task) AS night_tasks FROM TASK WHERE chooser_id = :user_id";
			try
			{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam("user_id", $user_id);
				$stmt->execute();
				$db = null;

				$night_task_info = $stmt->fetch(PDO::FETCH_ASSOC);
				$num_night_tasks = (int)$night_task_info['night_tasks'];
			}
			catch(PDOException $e)
			{
				echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
			}


			#NIGHT_OWL_TIER
			if($num_night_tasks > 0)
				$night_owl_tier = 1;
			if($num_night_tasks >= 25)
				$night_owl_tier = 2;
			if($num_night_tasks >= 50)
				$night_owl_tier = 3;
			if($num_night_tasks >= 100)
				$night_owl_tier = 4;



			$response = array('user_id' => (int)$userInfo['user_id'], 
							'email' => $userInfo['email'], 
							'first_name' => $userInfo['first_name'], 
							'last_name' => $userInfo['last_name'], 
							'phone' => $userInfo['phone'], 
							'birth_date' => $userInfo['birth_date'], 
							'gender' => $userInfo['gender'], 
							'times_reported' => (int)$userInfo['times_reported'], 
							'tokens' => (int)$userInfo['tokens'],
							'is_custom' => (int)$userInfo['is_custom'],
							'custom_image_path' => $userInfo['custom_image_path'],
							'jobs_completed' => (int)$userInfo['jobs_completed'],
							'jobs_requested' => (int)$userInfo['jobs_requested'],
							'speed' => (int)$userInfo['speed'],
							'reliability' => (int)$userInfo['reliability'],
							'completions_tier' => (int)$completions_tier,
							'requests_tier' => (int)$requests_tier,
							'night_owl_tier' => (int)$night_owl_tier);
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
	#	INPUTS:			User_id if not log in zero if log in user_id number	
	#	OUTPUTS:		JSON(category: {taskID: {first_name, last_name, short_description, notes, price, time_frame_date, time_frame_time, location}})
	#	STATUS:			NOT TESTED
    ##########
	function pullTasks()
	{
		$request = \Slim\Slim::getInstance()->request();
		$userObj = json_decode($request->getBody());
		$userID = (int)$userObj->user_id;

		//if not logged in returns all jobs
		if($userID == 0){
			$sql = "SELECT title AS category, t1.* FROM CATEGORY INNER JOIN (SELECT USER.first_name, USER.last_name, TASK.task_id, TASK.category_id, TASK.short_description, TASK.notes, TASK.price, TASK.time_frame_date, TASK.time_frame_time, TASK.location FROM USER INNER JOIN TASK ON USER.user_id = TASK.beggar_id AND is_complete = 0 AND chooser_id is NULL) AS t1 ON CATEGORY.category_id = t1.category_id";
		}
		
		//returns all jobs not posted by the user
		else {
			$sql = "SELECT title AS category, t1.* FROM CATEGORY INNER JOIN (SELECT USER.first_name, USER.last_name, TASK.task_id, TASK.category_id, TASK.short_description, TASK.notes, TASK.price, TASK.time_frame_date, TASK.time_frame_time, TASK.location FROM USER INNER JOIN TASK ON USER.user_id = TASK.beggar_id AND is_complete = 0 AND chooser_id is NULL AND USER.user_id != " . $userID . ") AS t1 ON CATEGORY.category_id = t1.category_id";
		}

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
			echo '{"success": true}';
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