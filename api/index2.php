<?php

	##########
	# 	AUTHOR:			Spencer
	#	LAST UPDATED:	4/18/14 - Modified return values to include additional information
	#					4/18/14 - Fixed bugs (INT casting and other)(CA)
	#					4/29/14 - Fixed bug where complete/cancelled jobs were still included (SK)
	#	SUMMARY:		Pulls a specified number of active jobs based on recency (most recent tasks are rated highest)
	#	INPUTS:			User id and num-tasks
	#	OUTPUTS:		JSON(task_id, beggar_id, first_name (beggar), last_name (beggar), short_description, notes, price, category_id, time_frame_date, time_frame_date, location, date_posted)
	#	STATUS:			COMPLETE
    ##########
	function recentTasks()
	{

	$request = \Slim\Slim::getInstance()->request();
	$userObj = json_decode($request->getBody());
	$userID = (int)$userObj->user_id;
	//limits the return of tasks
	$numTasks = (int)$userObj->num_tasks;

	//if not logged in returns at most num_tasks of jobs of all users
	if($userID == 0){
		$sql = "SELECT T.task_id, T.beggar_id, USER.first_name, USER.last_name, T.short_description, T.notes, T.price, T.category_id, T.time_frame_time, T.time_frame_date, T.location, T.date_posted FROM TASK T INNER JOIN USER ON T.beggar_id = USER.user_id WHERE T.is_complete = 0 GROUP BY task_id ORDER BY MAX(date_posted) desc LIMIT :num_tasks";
	}
	//if logged in returns at most num_tasks of jobs of all users not including current user
	else {
		$sql = "SELECT T.task_id, T.beggar_id, USER.first_name, USER.last_name, T.short_description, T.notes, T.price, T.category_id, T.time_frame_time, T.time_frame_date, T.location, T.date_posted FROM TASK T INNER JOIN USER ON T.beggar_id = USER.user_id WHERE USER.user_id != " . $userID . " AND T.is_complete = 0 GROUP BY task_id ORDER BY MAX(date_posted) desc LIMIT :num_tasks";
	}
	try
		{
			$db = getConnection();
			$stmt= $db->prepare($sql);
			$stmt->bindParam('num_tasks', $numTasks, PDO::PARAM_INT);
			$stmt->execute();
			$recentTasks = array();
			while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			{
				$tempObject  = array('task_id' => (int)$row['task_id'],
									'beggar_id' => (int)$row['beggar_id'], 
									'first_name' => $row['first_name'], 
									'last_name' => $row['last_name'], 
									'short_description' => $row['short_description'], 
								 	'notes' => $row['notes'], 
									'price' => (int)$row['price'], 
									'category_id' => (int)$row['category_id'], 
									'time_frame_time' => $row['time_frame_time'], 
									'time_frame_date' => $row['time_frame_date'], 
									'location' => $row['location'],
									'date_posted' => $row['date_posted']);
				array_push($recentTasks, $tempObject);
			}
			$db = null;
		   	echo json_encode($recentTasks);
	      	
      	}
	catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
		}
	}
	

	##########
	# 	AUTHOR:			Spencer
	#	LAST UPDATED:	4/18/14 - Modified to include return statement if successful (SK)
	#					- Added functionality for reading in parameters from JSON (SK)
	#	SUMMARY:		Adds tokens to a user's account
	#	INPUTS:			JSON(user_id, INT num_tokens)
	#	OUTPUTS:		JSON - SUCCESS
	#	STATUS:			COMPLETE
    ##########
	function addTokens()
	{
		$request = \Slim\Slim::getInstance()->request();
		$token_info = json_decode($request->getBody());
		
		$success = array('success'=>true);

		//GET TOKENS TO ADD & DECLARE previous_tokens
		$new_tokens = (int)$token_info->new_tokens;
		$previous_tokens = null;

		$sql = "SELECT tokens FROM USER WHERE user_id = :user_id";
		try
		{
			//GET PREVIOUS BALANCE
			if(isset($token_info))
			{
				$db = getConnection();
				$stmt= $db->prepare($sql);
				$stmt->bindParam('user_id', $token_info->user_id);
				$stmt->execute();
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
				$db = null;
				$previous_tokens = $row['tokens'];
			}
			else
				echo '{"error":{"text": "Login Info was not set" }}'; 


			//GET NEW BALANCE
			$new_balance = $previous_tokens + $new_tokens;	

			//UPDATE BALANCE ON SERVER
			$sql = "UPDATE USER SET tokens = :new_balance WHERE user_id = :user_id";
			try
			{
				$db = getConnection();
				$stmt= $db->prepare($sql);
				$stmt->bindParam('user_id', $token_info->user_id);
				$stmt->bindParam('new_balance', $new_balance, PDO::PARAM_INT);
				$stmt->execute();
				$db = null;
	      		echo json_encode($success);
      		}
			catch(PDOException $e) 
			{
				echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
			}
      	}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
		}
	}


	##########
	# 	AUTHOR:			Spencer
	#	LAST UPDATED:	4/18/14 - Modified to accept parameters from JSON (SK)
	#	SUMMARY:		Allows a user to upload a custom profile picture; the function modifies is_custom and adds a file path parameter to custom_image_path
	#	INPUTS:			JSON(user_id, file_path)
	#	OUTPUTS:		N/A
	#	STATUS:			COMPLETE
    ##########
	function changeProfileImage()
	{
	$request = \Slim\Slim::getInstance()->request();
	$image_info = json_decode($request->getBody());

		$sql = "UPDATE USER SET is_custom = 1, custom_image_path = :file_path WHERE user_id = :user_id";
		try
		{
			if(isset($image_info))
			{
				$db = getConnection();
				$stmt= $db->prepare($sql);
				$stmt->bindParam('user_id', $image_info->user_id);
				$stmt->bindParam('file_path', $image_info->file_path);
				$stmt->execute();
				$db = null;	

				echo '{"success": true}';
			}
			else
				echo '{"error":{"text": "JSON Was Empty" }}'; 				
      	}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
		}
	}


	##########
	# 	AUTHOR:			Spencer
	#	LAST UPDATED:	
	#	SUMMARY:		
	#	INPUTS:			
	#	OUTPUTS:		
	#	STATUS:			
    ##########
	function uploadProfileImage()
	{
		$allowedExts = array("gif", "jpeg", "jpg", "png");
		$temp = explode(".", $_FILES["file"]["name"]);
		$extension = end($temp);


		if ((($_FILES["file"]["type"] == "image/gif")
		|| ($_FILES["file"]["type"] == "image/jpeg")
		|| ($_FILES["file"]["type"] == "image/jpg")
		|| ($_FILES["file"]["type"] == "image/pjpeg")
		|| ($_FILES["file"]["type"] == "image/x-png")
		|| ($_FILES["file"]["type"] == "image/png"))
		&& ($_FILES["file"]["size"] < 200000000)
		&& in_array($extension, $allowedExts)) {
		  if ($_FILES["file"]["error"] > 0) {
		    echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
		  } else {
		    echo "Upload: " . $_FILES["file"]["name"] . "<br>";
		    echo "Type: " . $_FILES["file"]["type"] . "<br>";
		    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
		    echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br>";
		    if (file_exists("../img/user/" . $_FILES["file"]["name"])) {
		      echo $_FILES["file"]["name"] . " already exists. ";
		    } else {
		      move_uploaded_file($_FILES["file"]["tmp_name"],
		      "../img/user/" . $_FILES["file"]["name"]);
		      echo "Stored in: " . "../img/user/" . $_FILES["file"]["name"];
		    }
		  }
		} else {
		  echo "Invalid file";
		}

		// echo '{"error":{"text": "IN THE FUNCTION" }}'; 

		// echo $_FILES["file"]["name"]; 


		
		// if (file_exists("../img/user/" . $_FILES["file"]["name"])) 
		// {
		// 	echo $_FILES["file"]["name"] . " already exists. "; 
		// }
		// else
		// 	move_uploaded_file($_FILES["file"]["tmp_name"], "../img/user/");
				

		// echo $_FILES["file"]["name"];




		// move_uploaded_file($$_FILES["file"]["tmp_name"], "../img/user/");


		// #SOURCE: http://www.w3schools.com/php/php_file_upload.asp
		// $allowedExts = array("gif", "jpeg", "jpg", "png");
		// $temp = explode(".", $_FILES["file"]["name"]);
		// $extension = end($temp);

		// #echo "File Info:" . $_FILES["file"]["type"];


		// if (file_exists("../img/user/" . $_FILES["file"]["name"]))
	 //      {
	 //      echo $_FILES["file"]["name"] . " already exists. ";
	 //      }
	 //    else
	 //      {
	 //      move_uploaded_file($_FILES["file"]["tmp_name"], "../img/user/" . $_FILES["file"]["name"]);
	 //      echo "Stored in: " . "../img/user/" . $_FILES["file"]["name"];
	 //      }


#		(($_FILES["file"]["type"] == "image/gif")
#		|| ($_FILES["file"]["type"] == "image/jpeg")
#		|| ($_FILES["file"]["type"] == "image/jpg")
#		|| ($_FILES["file"]["type"] == "image/pjpeg")
#		|| ($_FILES["file"]["type"] == "image/x-png")
#		|| ($_FILES["file"]["type"] == "image/png")) && 	


		// if (($_FILES["file"]["size"] < 20000)
		// && in_array($extension, $allowedExts)) {
		//   if ($_FILES["file"]["error"] > 0) {
		//     echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
		//   } else {
		//     echo "Upload: " . $_FILES["file"]["name"] . "<br>";
		//     echo "Type: " . $_FILES["file"]["type"] . "<br>";
		//     echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
		//     echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br>";
		//     if (file_exists("img/user/" . $_FILES["file"]["name"])) {
		//       echo $_FILES["file"]["name"] . " already exists. ";
		//     } else {
		//       move_uploaded_file($_FILES["file"]["tmp_name"],
		//       "img/user/" . $_FILES["file"]["name"]);
		//       echo "Stored in: " . "img/user/" . $_FILES["file"]["name"];
		//     }
		//   }
		// } else {
		//   echo "Invalid file";
		// }
		#END CITATION
	}


	##########
	#	AUTHOR:			Spencer
	#	LAST UPDATE:	4/18/14 - Fixed array to actually include offer_id (CA)
	#	SUMMARY:		Returns a JSON array of all the offers a specific user has made
	#	INPUTS:			user_id
	#	OUTPUTS:		JSON array containing offer information and chooser information
	#	STATUS:			COMPLETE
    ##########
	function getOffers($user_id)
	{
	$request = \Slim\Slim::getInstance()->request();
	#$user_info = json_decode($request->getBody());
	$user_id = intval($user_id);

	$sql= "SELECT OFFERS.offer_id, TASK.task_id, TASK.beggar_id, TASK.price, TASK.category_id, TASK.short_description, TASK.time_frame_time, TASK.time_frame_date, TASK.date_posted, USER.first_name AS ChooserFirst, USER.last_name AS ChooserLast, USER_DATA.speed AS ChooserSpeed, USER_DATA.reliability AS ChooserReliability, USER.is_custom, USER.custom_image_path FROM TASK INNER JOIN OFFERS ON OFFERS.task_id = TASK.task_id INNER JOIN USER ON OFFERS.chooser_id = USER.user_id INNER JOIN USER_DATA ON USER.user_id = USER_DATA.user_id WHERE TASK.beggar_id = :user_id AND OFFERS.is_hidden = 0";
	try
	      {
			$db = getConnection();
			$stmt= $db->prepare($sql);
			#$stmt->bindParam("user_id", $user_info->user_id);
			$stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
			$stmt->execute();
			$offers = array();
			while($row = $stmt->fetch(PDO::FETCH_ASSOC)) //I'm not 100% sure about this line but I'm using login as a guide for this
			{
				$tempObject = array('offer_id' =>(int)$row['offer_id'],
											  'task_id' => (int)$row['task_id'], 
											  'beggar_id' => (int)$row['beggar_id'], 
											  'price' => (int)$row['price'], 
											  'category_id' => $row['category_id'], 
											  'short_description' => $row['short_description'], 
											  'time_frame_time' => $row['time_frame_time'], 
											  'time_frame_date' => $row['time_frame_date'], 
											  'date_posted' => $row['date_posted'], 
											  'ChooserFirst' => $row['ChooserFirst'],
											  'ChooserLast' => $row['ChooserLast'],
									  		  'ChooserSpeed' => $row['ChooserSpeed'],
									  		  'ChooserReliability' => $row['ChooserReliability'],
  									  		  'is_custom' => $row['is_custom'],
  									  		  'custom_image_path' => $row['custom_image_path']);
				array_push($offers, $tempObject);
			}
			$db = null;
		   	echo json_encode($offers);
		   
	      }  
		catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
		}
	}


	##########
	#	AUTHOR:			Charlie
	#	LAST UPDATE:	4/18/14 - Added functionality to set is_hidden field (SK/CA)
	#					4/29/14 - Fixed a bug that allowed users to offer help multiple times for the same job (SK/CA)
	#	SUMMARY:		Uses a user_id and a task_id to make an offer to a user asking for help
	#	INPUTS:			user_id, task_id
	#	OUTPUTS:		N/A
	#	STATUS:			COMPLETE
    ##########
	function makeOffer()
	{
		$request = \Slim\Slim::getInstance()->request();
		$offer_info = json_decode($request->getBody());
		$is_hidden = null;
		$existing_offer = FALSE;

		$sql = "SELECT is_hidden FROM USER WHERE user_id = :user_id";
		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("user_id", $offer_info->user_id);
			$stmt->execute();
			$info = $stmt->fetch(PDO::FETCH_OBJ);
			$is_hidden = $info->is_hidden;
			$db = null;

			//echo '{"success": true}';
		}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
		}


		$sql = "SELECT * FROM OFFERS WHERE chooser_id = :user_id AND task_id = :task_id";
		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("user_id", $offer_info->user_id);
			$stmt->bindParam("task_id", $offer_info->task_id);
			$stmt->execute();
			$info = $stmt->fetch(PDO::FETCH_ASSOC);
			
			if(empty($info))
				$existing_offer = FALSE;
			else
				$existing_offer = TRUE;

			$db = null;

			//echo '{"success": true}';
		}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
		}


		if($existing_offer == FALSE)
		{
			$sql = "INSERT INTO OFFERS (`task_id`, `chooser_id`, `is_hidden`) VALUES (:task_id, :user_id, :is_hidden)";
			try
			{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam("task_id", $offer_info->task_id);
				$stmt->bindParam("user_id", $offer_info->user_id);
				$stmt->bindParam("is_hidden", $is_hidden);

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
			echo '{"error":{"text": "You have already made an offer for this job!"}}';
	}


	##########
	#	AUTHOR:			Spencer
	#	LAST UPDATE:	4/21 - Modified loops and array to return additional information in a more efficient format (SK)
	#	SUMMARY:		Using user_id as a parameter, pulls all tasks submitted by that user and their corresponding offers
	#	INPUTS:			user_id (The person checking the status of their tasks)
	#	OUTPUTS:		A JSON containing all tasks submitted by a user and any offers those tasks received
	#	STATUS:			COMPLETE
    ##########
	function getMyTasksAndPendingOffers($user_id)
	{
		$myTasks = array();
		$request = \Slim\Slim::getInstance()->request();
		$user_id = intval($user_id);
		

		#WE NEED TO ADD ADDITIONAL INFORMATION TO THIS (SEE BOTTOM LOOP)
		#GET ALL TASKS CREATED BY A USER
		$sql = "SELECT task_id, beggar_id, chooser_id, price, category_id, short_description, location, notes, 
			time_frame_time, time_frame_date, date_posted FROM TASK WHERE beggar_id = :user_id AND is_complete = '0'";
		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
			$stmt->execute();
			
			#LOOP THROUGH EACH TASK POSTED BY USER
			while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			{
				#STORE TASK_ID FOR USE IN NEXT LOOP
				$temp_taskid = (int)$row['task_id'];
				$temp_chooser_id = $row['chooser_id'];
				
				$tempObject = array('is_offer_for_help' => (int)"0",
										  'task_id' => (int)$row['task_id'], 
										  'beggar_id' => (int)$row['beggar_id'], 
										  'chooser_id' => (int)$row['chooser_id'], 
										  'price' => (int)$row['price'], 
										  'category_id' => (int)$row['category_id'], 
										  'short_description' => $row['short_description'], 
										  'location' => $row['location'], 
										  'notes' => $row['notes'], 										  
										  'time_frame_time' => $row['time_frame_time'], 
										  'time_frame_date' => $row['time_frame_date'], 
										  'date_posted' => $row['date_posted']);

				
				if($temp_chooser_id != null)
				{
					$sql3 = "SELECT USER.first_name AS chooser_fName, USER.last_name AS chooser_lName, USER.phone AS contact_phone, USER.email AS contact_email, USER_DATA.speed AS chooser_speed, USER_DATA.reliability AS chooser_reliability, USER.is_custom, USER.custom_image_path FROM USER INNER JOIN USER_DATA ON USER.user_id = USER_DATA.user_id WHERE USER.user_id = :user_id";
					try
						{
							$db2 = getConnection();
							$stmt3 = $db2->prepare($sql3);
							$stmt3->bindParam("user_id", $temp_chooser_id, PDO::PARAM_INT);
							$stmt3->execute();

							$chooser_data = $stmt3->fetch(PDO::FETCH_ASSOC);
							$additional_info = array('chooser_fName' => $chooser_data['chooser_fName'],
								  'chooser_lName' => $chooser_data['chooser_lName'],
								  'contact_phone' => $chooser_data['contact_phone'],
								  'contact_email' => $chooser_data['contact_email'],
						  		  'chooser_speed' => $chooser_data['chooser_speed'],
						  		  'chooser_reliability' => $chooser_data['chooser_reliability'],
						  		  'is_custom' => $chooser_data['is_custom'],
						  		  'custom_image_path' => $chooser_data['custom_image_path']);

							$tempObject = array_merge($tempObject, $additional_info);
							#$tempObject = $tempObject2;
							#echo json_encode($additional_info);

						}
					catch(PDOException $e)
						{
							echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
						} 
				}
				

				#PUSH INDIVIDUAL TASKS INTO THE ARRAY
				array_push($myTasks, $tempObject);

				#PULL OFFERS FOR TASKS WHERE TASK_ID = TEMP_TASKID (EACH ROW OF THE ABOVE LOOP)
				$sql2 = "SELECT OFFERS.offer_id, TASK.task_id, TASK.beggar_id, TASK.price, TASK.category_id, TASK.short_description, TASK.time_frame_time, TASK.time_frame_date, TASK.date_posted, USER.user_id, USER.first_name AS chooser_fName, USER.last_name AS chooser_lName, USER.phone, USER.email, USER_DATA.speed AS chooser_speed, USER_DATA.reliability AS chooser_reliability, USER.is_custom, USER.custom_image_path FROM TASK INNER JOIN OFFERS ON OFFERS.task_id = TASK.task_id INNER JOIN USER ON OFFERS.chooser_id = USER.user_id INNER JOIN USER_DATA ON USER.user_id = USER_DATA.user_id WHERE TASK.task_id = :task_id AND OFFERS.is_hidden = 0 AND OFFERS.is_declined = 0 AND OFFERS.is_accepted = 0";
				try
				{
					if(isset($temp_taskid))
					{
						$db2 = getConnection();
						$stmt2 = $db2->prepare($sql2);
						$stmt2->bindParam("task_id", $temp_taskid, PDO::PARAM_INT);
						$stmt2->execute();	

						#PUSH RELEVANT INFO TO ARRAY (TO BE INCLUDED IN JSON)
						while($row2 = $stmt2->fetch(PDO::FETCH_ASSOC))
						{
							$tempObject2 = array('is_offer_for_help' => (int)"1",
								  'offer_id' =>(int)$row2['offer_id'],
								  'task_id' => (int)$row2['task_id'], 
								  'beggar_id' => (int)$row2['beggar_id'], 
								  'price' => (int)$row2['price'], 
								  'category_id' => (int)$row2['category_id'], 
								  'short_description' => $row2['short_description'], 
								  'time_frame_time' => $row2['time_frame_time'], 
								  'time_frame_date' => $row2['time_frame_date'], 
								  'date_posted' => $row2['date_posted'], 
								  'chooser_id' => (int)$row2['user_id'],
								  'chooser_fName' => $row2['chooser_fName'],
								  'chooser_lName' => $row2['chooser_lName'],
								  'contact_phone' => $row2['phone'],
								  'contact_email' => $row2['email'],
						  		  'chooser_speed' => $row2['chooser_speed'],
						  		  'chooser_reliability' => $row2['chooser_reliability'],
						  		  'is_custom' => $row2['is_custom'],
						  		  'custom_image_path' => $row2['custom_image_path']);
							
							#ADD CORRESPONDING OFFERS TO ARRAY
							array_push($myTasks, $tempObject2);
						}
						$db2 = null;
					}
					else
						echo '{"error":{"text": "No task_id!"}}';
				}

			catch(PDOException $e)
				{
					echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
				}
			}
   			
   			#RETURN OUTPUT IN [JOB, OFFER, OFFER, OFFER], [JOB, OFFER, ...] FORMAT
   			echo json_encode($myTasks);
   			$db = null;
		}

	catch(PDOException $e)
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
		}
	}


	##########
	#	AUTHOR:			Spencer
	#	LAST UPDATE:	
	#	SUMMARY:		Declines an offer made by a user (user_id) for a specific task (task_id)
	#	INPUTS:			user_id (essentially chooser_id), task_id
	#	OUTPUTS:		N/A
	#	STATUS:			COMPLETE
    ##########
	function declineOffer($user_id, $task_id)
	{
	$request = \Slim\Slim::getInstance()->request();
	#$user_info = json_decode($request->getBody());
	$user_id = intval($user_id);
	$task_id = intval($task_id);

	$sql= "UPDATE OFFERS SET is_declined = 1 WHERE chooser_id = :user_id AND task_id = :task_id;";
	try
	    {
			$db = getConnection();
			$stmt= $db->prepare($sql);
			
			#FOR INPUT JSON USE:
			#$stmt->bindParam("user_id", $user_info->user_id, PDO::PARAM_INT);
			#$stmt->bindParam("task_id", $user_info->task_id, PDO::PARAM_INT);
			
			#FOR PARAMETER USE:
			$stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
			$stmt->bindParam("task_id", $task_id, PDO::PARAM_INT);
			
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
	#	AUTHOR:			Spencer
	#	LAST UPDATE:	
	#	SUMMARY:		Accepts an offer made by a user (user_id) for a specific task (task_id)
	#						and declines all other pending offers for that task
	#					- TASK.chooser_id is set as soon as the offer is accepted via the OFFER.accept_offer trigger
	#	INPUTS:			user_id (essentially chooser_id), task_id
	#	OUTPUTS:		N/A
	#	STATUS:			COMPLETE
    ##########
	function acceptOffer($user_id, $task_id)
	{
	$request = \Slim\Slim::getInstance()->request();
	#$user_info = json_decode($request->getBody());
	$user_id = intval($user_id);
	$task_id = intval($task_id);

	#NOTE: The UPDATE command does not set TASK.chooser_id equal to the correct chooser_id...
		#That is done automatically in the DB using the offer_accepted trigger
	#SET IS_ACCEPTED = 1 FOR THE OFFER BEING ACCEPTED, AUTOMATICALLY SET TASK.CHOOSER_ID TO REFLECT ACCEPTANCE
	$sql= "UPDATE OFFERS SET is_accepted = 1 WHERE chooser_id = :user_id AND task_id = :task_id;";
	try
	    {
			$db = getConnection();
			$stmt= $db->prepare($sql);
			
			#FOR INPUT JSON USE:
			#$stmt->bindParam("user_id", $user_info->user_id, PDO::PARAM_INT);
			#$stmt->bindParam("task_id", $user_info->task_id, PDO::PARAM_INT);
			
			#FOR PARAMETER USE:
			$stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
			$stmt->bindParam("task_id", $task_id, PDO::PARAM_INT);
			
			$stmt->execute();

			$db = null;
      		echo '{"success": true}';
	    }  
	catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
		}

	#DECLINE ALL OTHER PENDING OFFERS
	$sql= "UPDATE OFFERS SET is_declined = 1 WHERE chooser_id != :user_id AND task_id = :task_id;";
	try
	    {
			$db = getConnection();
			$stmt= $db->prepare($sql);
			
			#FOR INPUT JSON USE:
			#$stmt->bindParam("user_id", $user_info->user_id, PDO::PARAM_INT);
			#$stmt->bindParam("task_id", $user_info->task_id, PDO::PARAM_INT);
			
			#FOR PARAMETER USE:
			$stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);
			$stmt->bindParam("task_id", $task_id, PDO::PARAM_INT);
			
			$stmt->execute();

			$db = null;
      		#echo json_encode($success);
	    }  
	catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
		}
	}


	##########
	#	AUTHOR:			Spencer
	#	LAST UPDATE:	4/30/19 - Added an additional loop a previously_completed to prevent rating inflation
	#	SUMMARY:		Marks a task as complete in the DB and updates the chooser's rating
	#	INPUTS:			task_id, num_stars_speed, num_stars_reliability
	#	OUTPUTS:		N/A
	#	STATUS:			COMPLETE
    ##########
	function completeTask($task_id, $num_stars_speed, $num_stars_reliability)
	{
	$request = \Slim\Slim::getInstance()->request();
	#$user_info = json_decode($request->getBody());
	
	#FOR JSON USE
	#$task_id = (int)$user_info['task_id'];
	#$num_stars_speed = (int)$user_info['num_stars_speed'];
	#$num_stars_reliability = (int)$user_info['num_stars_reliability'];

	#FOR PARAMETER USE
	$task_id = intval($task_id);
	$num_stars_speed = intval($num_stars_speed);
	$num_stars_reliability = intval($num_stars_reliability);



	$previously_completed = FALSE;


	$sql = "SELECT chooser_id FROM TASK WHERE task_id = :task_id AND is_complete = 0";
	try
	{
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("task_id", $task_id, PDO::PARAM_INT);
		$stmt->execute();
		$db = null;

		$info = $stmt->fetch(PDO::FETCH_ASSOC);

		if(empty($info))
			$previously_completed = TRUE;
		else
			$previously_completed = FALSE;			
	}
	catch(PDOException $e)
	{
		echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}';
	}



	if($previously_completed == FALSE)
	{
		$chooser_id = 0;
		$jobs_completed = 0;
		$curr_speed = 0;
		$curr_reliability = 0;

		#MARK TASK AS COMPLETE
		$sql= "UPDATE TASK SET is_complete = 1 WHERE task_id = :task_id AND is_complete != 1";
		try
		    {
				$db = getConnection();
				$stmt= $db->prepare($sql);

				$stmt->bindParam("task_id", $task_id, PDO::PARAM_INT);
				
				$stmt->execute();

				$db = null;
	      		#echo json_encode($success);


				#RETRIEVE USER_ID & USER DATA
				$sql="SELECT TASK.chooser_id, USER_DATA.jobs_completed, USER_DATA.speed, USER_DATA.reliability FROM TASK INNER JOIN USER_DATA ON TASK.chooser_id = USER_DATA.user_id WHERE task_id = :task_id";
				try
				    {
						$db = getConnection();
						$stmt= $db->prepare($sql);

						$stmt->bindParam("task_id", $task_id, PDO::PARAM_INT);
						
						$stmt->execute();

						$user_info = $stmt->fetch(PDO::FETCH_ASSOC);

						$chooser_id = (int)$user_info['chooser_id'];
						$jobs_completed = (int)$user_info['jobs_completed'];
						$curr_speed = (int)$user_info['speed'];
						$curr_reliability = (int)$user_info['reliability'];

						#$chooser_id = (int)$stmt-fetch(PDO::FETCH_ASSOC)['chooser_id'];

						$db = null;
			      		#echo json_encode($success);
				    }  
				catch(PDOException $e) 
					{
						echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
					}
		    }  
		catch(PDOException $e) 
			{
				echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
			}



		#THIS DOES NOT WORK
			#IF THE PREVIOUS TRY EXECUTED, CHOOSER WILL BE SET AND THIS WILL EXECUTE AS WELL

		#CALCULATE NEW RATINGS
		if($chooser_id != 0)
		{
			#NOTE: jobs_requested and jobs_completed are automatically incremented by a trigger in TASK
				#At this point, the jobs_completed variable includes the job that was rated (hence the -1)

			#New Reliability/Speed = ((# of Jobs Completed / # of Jobs Completed + 1) * (Current Reliability / 100)) + ((1/ # of Jobs Completed + 1) * (# stars / 5))

			$updated_speed = (int)((((($jobs_completed - 1) / $jobs_completed) * ($curr_speed/100)) + ((1 / $jobs_completed) * ($num_stars_speed/5)))*100);
			$updated_reliability = (int)((((($jobs_completed - 1) / $jobs_completed) * ($curr_reliability/100)) + ((1 / $jobs_completed) * ($num_stars_reliability/5)))*100);


			#UPDATE RATINGS IN DB
			$sql= "UPDATE USER_DATA SET speed = :updated_speed, reliability = :updated_reliability WHERE user_id = :user_id";
			try
			    {
					$db = getConnection();
					$stmt= $db->prepare($sql);
					
					$stmt->bindParam("user_id", $chooser_id, PDO::PARAM_INT);
					$stmt->bindParam("updated_speed", $updated_speed, PDO::PARAM_INT);
					$stmt->bindParam("updated_reliability", $updated_reliability, PDO::PARAM_INT);

					$stmt->execute();

					$db = null;
		      		#echo json_encode($success);
			    }  
			catch(PDOException $e) 
				{
					echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
				}
		}
	}
	else
		echo '{"error":{"text": "This job has already been completed!" }}'; 

	}


	##########
	#	AUTHOR:			Spencer
	#	LAST UPDATE:	4/29/14 - Modifed SQL query to ensure jobs_completed is not incremented when a beggar cancels their own task (SK)
	#	SUMMARY:		Declines an offer made by a user (user_id) for a specific task (task_id)
	#	INPUTS:			user_id (essentially chooser_id), task_id
	#	OUTPUTS:		N/A
	#	STATUS:			NEEDS BUG FIXING
    ##########
	function cancelTask($user_id, $task_id)
	{
	$request = \Slim\Slim::getInstance()->request();
	#$user_info = json_decode($request->getBody());
	$task_id = intval($task_id);
	$user_id = intval($user_id);
	$task_info = null;

	#GET BEGGAR_ID & CHOOSER_ID FOR TASK TO COMPARE AGAINST USER_ID
	$sql= "SELECT beggar_id, chooser_id FROM TASK WHERE task_id = :task_id";
	try
	    {
			$db = getConnection();
			$stmt= $db->prepare($sql);
			
			#FOR INPUT JSON USE:
			#$stmt->bindParam("user_id", $user_info->user_id, PDO::PARAM_INT);
			#$stmt->bindParam("task_id", $user_info->task_id, PDO::PARAM_INT);
			
			#FOR PARAMETER USE:
			$stmt->bindParam("task_id", $task_id, PDO::PARAM_INT);
			
			$stmt->execute();

			$db = null;

			$task_info = $stmt->fetch(PDO::FETCH_ASSOC);
      		echo '{"success": true, "location": "GET_ID"}';

	    }  
	catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
		}


	#BEGGAR CANCELS
	if($user_id == (int)$task_info['beggar_id'])
		{
			$sql = "UPDATE OFFERS SET is_accepted = 0, is_declined = 1 WHERE task_id = :task_id AND chooser_id != :user_id";
			try
	    		{
					$db = getConnection();
					$stmt= $db->prepare($sql);
					
					#FOR INPUT JSON USE:
					#$stmt->bindParam("user_id", $user_info->user_id, PDO::PARAM_INT);
					#$stmt->bindParam("task_id", $user_info->task_id, PDO::PARAM_INT);
					
					#FOR PARAMETER USE:
					$stmt->bindParam("task_id", $task_id, PDO::PARAM_INT);
					$stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);

					$stmt->execute();

					$db = null;
					echo '{"success": true, "location": "BEGGAR_CANCEL"}';



					$sql = "UPDATE TASK SET is_complete = 1, chooser_id = null WHERE task_id = :task_id";
					try
				    	{
							$db = getConnection();
							$stmt= $db->prepare($sql);
							
							#FOR INPUT JSON USE:
							#$stmt->bindParam("user_id", $user_info->user_id, PDO::PARAM_INT);
							#$stmt->bindParam("task_id", $user_info->task_id, PDO::PARAM_INT);
							
							#FOR PARAMETER USE:
							$stmt->bindParam("task_id", $task_id, PDO::PARAM_INT);
							
							$stmt->execute();

							$db = null;
				      		echo '{"success": true, "location": "TASK_COMPLETE"}';

				    	}  
					catch(PDOException $e) 
						{
							echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
						}
				}  
			catch(PDOException $e) 
				{
					echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
				}
		}

	#CHOOSER CANCELS
	else if($user_id == (int)$task_info['chooser_id'])
		{
			$sql = "UPDATE OFFERS SET is_accepted = 0, is_declined = 1 WHERE task_id = :task_id AND chooser_id = :user_id";
			try
	    		{
					$db = getConnection();
					$stmt= $db->prepare($sql);
					
					#FOR INPUT JSON USE:
					#$stmt->bindParam("user_id", $user_info->user_id, PDO::PARAM_INT);
					#$stmt->bindParam("task_id", $user_info->task_id, PDO::PARAM_INT);
					
					#FOR PARAMETER USE:
					$stmt->bindParam("task_id", $task_id, PDO::PARAM_INT);
					$stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);

					$stmt->execute();

					$db = null;
		      		echo '{"success": true, "location": "CHOOSER_CANCEL"}';


					$sql = "UPDATE TASK SET chooser_id = null WHERE task_id = :task_id";
					try
				    	{
							$db = getConnection();
							$stmt= $db->prepare($sql);
							
							#FOR INPUT JSON USE:
							#$stmt->bindParam("user_id", $user_info->user_id, PDO::PARAM_INT);
							#$stmt->bindParam("task_id", $user_info->task_id, PDO::PARAM_INT);
							
							#FOR PARAMETER USE:
							$stmt->bindParam("task_id", $task_id, PDO::PARAM_INT);
							
							$stmt->execute();

							$db = null;
				      		echo '{"success": true, "location": "TASK_ACTIVE"}';

				    	}  
					catch(PDOException $e) 
						{
							echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
						}
		    	}  
			catch(PDOException $e) 
				{
					echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
				}

		}

	}







