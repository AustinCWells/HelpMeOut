<?php

	##########
	# 	AUTHOR:			Spencer
	#	LAST UPDATED:	4/18/14 - Modified return values to include additional information
	#	SUMMARY:		Pulls a specified number of active jobs based on recency (most recent tasks are rated highest)
	#	INPUTS:			INT num_tasks
	#	OUTPUTS:		JSON(task_id, beggar_id, first_name (beggar), last_name (beggar), short_description, notes, price, category_id, time_frame_date, time_frame_date, location, date_posted)
	#	STATUS:			COMPLETE
    ##########
	function recentTasks($numTasks)
	{
	$numTasks = intval($numTasks);
	$request = \Slim\Slim::getInstance()->request();
	$sql = "SELECT T.task_id, T.beggar_id, USER.first_name, USER.last_name, T.short_description, T.notes, T.price, T.category_id, T.time_frame_time, T.time_frame_date, T.location, T.date_posted FROM TASK T INNER JOIN USER ON T.beggar_id = USER.user_id GROUP BY task_id ORDER BY MAX(date_posted) desc LIMIT :num_tasks";
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
	#	LAST UPDATED:	4/18/14 - Modified to include return statement if successful
	#					- Added functionality for reading in parameters from JSON
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
	#	STATUS:			IN PROGRESS
    ##########
	function changeProfileImage()
	{
		$request = \Slim\Slim::getInstance()->request();
		$image_info = json_decode($request->getBody());

		$success = array('success'=>true);

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
				echo json_encode($success);

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
	#	AUTHOR:			Spencer
	#	LAST UPDATE:	4/18/14
	#	SUMMARY:		
	#	INPUTS:			
	#	OUTPUTS:		
	#	STATUS:			IN PROGRESS
    ##########
	function getOffers($user_id)
	{
	$request = \Slim\Slim::getInstance()->request();
	#$user_info = json_decode($request->getBody());
	$user_id = intval($user_id);
	#LEFT OFF HERE
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

	function makeOffer()
	{
		$request = \Slim\Slim::getInstance()->request();
		$offer_info = json_decode($request->getBody());
		$sql = "INSERT INTO OFFERS (`task_id`, `chooser_id`) VALUES (:task_id, :user_id)";

		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("task_id", $offer_info->task_id);
			$stmt->bindParam("user_id", $offer_info->user_id);
			$stmt->execute();
			$db = null;

			//echo '{"success": true}';
		}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":' . "\"" . $e->getMessage() . "\"" . '}}'; 
		}
	}

?>