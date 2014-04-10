<?php

	##########
	# 	AUTHOR:			Spencer
	#	LAST UPDATED:	4/10/14
	#	SUMMARY:		Pulls a specified number of active jobs based on recency (most recent tasks are rated highest)
	#	INPUTS:			INT num_tasks
	#	OUTPUTS:		JSON(task_id, beggar_id, chooser_id, short_description, notes, price, category_id, negotiable, time_frame_date, time_frame_date, location, date_posted)
	#	STATUS:			NEEDS TESTING
    ##########
	function recentTasks($num_tasks)
	{
	$request = \Slim\Slim::getInstance()->request();
	$sql = "SELECT * FROM TASK GROUP BY task_id ORDER BY MAX(date_posted) LIMIT :num_tasks";
	try
		{
			$num_tasks = intval($num_tasks);
			$db = getConnection();
			$stmt= $db->prepare($sql);
			$stmt->bindParam('num_tasks', $num_tasks, PDO::PARAM_INT);
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
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}
?>