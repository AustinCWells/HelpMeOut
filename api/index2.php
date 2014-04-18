<?php

	##########
	# 	AUTHOR:			Spencer
	#	LAST UPDATED:	4/10/14
	#	SUMMARY:		Pulls a specified number of active jobs based on recency (most recent tasks are rated highest)
	#	INPUTS:			INT num_tasks
	#	OUTPUTS:		JSON(task_id, beggar_id, chooser_id, short_description, notes, price, category_id, negotiable, time_frame_date, time_frame_date, location, date_posted)
	#	STATUS:			COMPLETE
    ##########
	function recentTasks()
	{
	$request = \Slim\Slim::getInstance()->request();
	$data = json_decode($request->getBody());
	$sql = "SELECT * FROM TASK GROUP BY task_id ORDER BY MAX(date_posted) LIMIT :num_tasks";
	try
		{
			$db = getConnection();
			$stmt= $db->prepare($sql);
			$stmt->bindParam('num_tasks', (int)$data->num_tasks);
			$stmt->execute();
			$recentTasks = null;
			while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			{
				$taskID = $row['task_id'];
				$recentTasks[$taskID] = array('beggar_id' => (int)$row['beggar_id'], 
											  'chooser_id' => (int)$row['chooser_id'], 
											  'short_description' => $row['short_description'], 
											  'notes' => $row['notes'], 
											  'price' => (int)$row['price'], 
											  'category_id' => (int)$row['category_id'], 
											  'negotiable' => (int)$row['negotiable'], 
											  'time_frame_date' => $row['time_frame_date'], 
											  'time_frame_time' => $row['time_frame_time'], 
											  'location' => $row['location'],
											  'date_posted' => $row['date_posted']);
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
	#	INPUTS:			JSON(user_id)
	#	OUTPUTS:		JSON(beggar_id, chooser_id, short_description, notes, price, category_id, negotiable, time_frame_date, time_frame_time, location)
	#	STATUS:			Not Working- Object passing Null Values even though Jordan is sending us a "user_id"
    ##########
	function getOffers()
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

?>