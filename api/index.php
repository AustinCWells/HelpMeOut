<?php
	
	require '../vendor/autoload.php';
	$app = new \Slim\Slim();

	$app->post('/login', 'login');
	$app->post('/newaccount', 'createAccount');
	$app->get('/jobs',  'pullJobs');
	//$app->post('/paymentinfo', 'getPaymentInfo');
	//$app->post('/placeorder', 'createOrder');
	//$app->post('/lastorder', 'getLastOrder');
	//$app->get('/locations', 'findTrucks');
	//$app->get('/menu', 'getMenu');

	$app->run();


	// COMPLETE BUT NOT TESTED
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

	function pullJobs()
	{
		$request = \Slim\Slim::getInstance()->request();
		$userObj = json_decode($request->getBody());
		$userID = (int)$userObj->user_id;

		try
		{
			if($userID == 0)
			{
				$taskList['tasks'] = getJobs();
				echo json_encode($taskList);
			}
			else
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

	function getJobs()
	{

		$sql = "SELECT * FROM CATEGORY c INNER JOIN TASK t ON c.category_id = t.category_id INNER JOIN USER u ON t.beggar_id = u.user_id WHERE t.is_complete = '0'";
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


/*

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

	// NOT COMPLETED
	function createOrder()
	{
		//change for Taco Orders
		$request = \Slim\Slim::getInstance()->request();
		$order = json_decode($request->getBody());
		$sql = "INSERT INTO Orders (`user_id`, `date`, `total`) VALUES (:user_id, NOW(), :total)";
		try 
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("user_id", $order->user_id);
			$stmt->bindParam("total", $order->total);
			$stmt->execute();

			$orderID = $db->lastInsertId();
			$tacos = $order->tacos;

			$sql2 = "INSERT INTO OrderItem (`order_id`, `quantity`) VALUES (:order_id, :quantity)";
			foreach($tacos as $taco)
			{
				$stmt2 = $db->prepare($sql2);
				$stmt2->bindParam("order_id", $order_id);
				$stmt2->bindParam("quantity", $taco->qty);

				$order_item_id = $db->lastInsertId();
				$fixings = $taco->fixins;

				$sql3 = "INSERT INTO OrderDetails (`order_item_id`, `taco_fixin_id`) VALUES (:orderItemID, :tacoFixinID)";
				foreach($fixings as $tacoFixinID)
				{
					$stmt3 = $db->prepare($sql3);
					$stmt3->bindParam("orderItemID", $order_item_id);
					$stmt3->bindParam("tacoFixinID", $tacoFixinID);
				}
			}

			$db = null;
		} 
		catch(PDOException $e) 
		{
			error_log($e->getMessage(), 3, '/var/tmp/php.log');
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}

	function getLastOrder()
	{
		$sql = "SELECT user_id, order_id, MAX(date) AS latest, total FROM Orders WHERE user_id = :id";
		$request = \Slim\Slim::getInstance()->request();
		$info = json_decode($request->getBody());
		try
		{
			$order;
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $info->id);
			$stmt->execute();
			$orderInfo = $stmt->fetch(PDO::FETCH_OBJ);
			$db = null;

			$order['user_id'] = (int)$info->id;
			$order_id = (int)$orderInfo->order_id;
			$order['order_id'] = $order_id;
			$order_cost = (double)$orderInfo->total;
			$order['total'] = $order_cost;

			$sql2 = "SELECT order_item_id, quantity FROM OrderItem WHERE order_id = :order_id";

			$db = getConnection();
			$stmt2 = $db->prepare($sql2);
			$stmt2->bindParam("order_id", $order_id);
			$stmt2->execute();

			$tacos;
			while($row = $stmt2->fetch(PDO::FETCH_ASSOC))
			{
				$sql3 = "SELECT taco_fixin_id FROM OrderDetails WHERE order_item_id = :order_item_id";
				$itemID = $row['order_item_id'];
				$stmt3 = $db->prepare($sql3);
				$stmt3->bindParam("order_item_id", $itemID);
				$stmt3->execute();

				$fixins = array();
				while($row2 = $stmt3->fetch(PDO::FETCH_ASSOC))
				{
					$tacoFixinID = $row2['taco_fixin_id'];
					$fixins[] = $tacoFixinID;
				}
				$tacos['quantity'] = $row['quantity'];
				$tacos['fixins'] = $fixins;
				$order['tacos'][] = $tacos;
			}
			$db = null;

			echo '{"order": ' . json_encode($order) . '}';

		}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}

	// WORKING
	function findTrucks()
	{
		$sql = "SELECT location_name, address, city, state, zipcode FROM Locations ORDER BY location_name";
		try
		{
			$db = getConnection();
			$stmt = $db->query($sql);
			$locations;
			while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			{
				$location = array('name' => $row['location_name'], 'address' => $row['address'], 'city' => $row['city'], 'state' => $row['state'], 'zipcode' => (int)$row['zipcode']);
				$locations[] = $location;
			}
			$db = null;
			echo json_encode($locations);
		}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}

	function getMenu()
	{
		$sql = "SELECT * FROM Menu";
		try
		{
			$db = getConnection();
			$stmt = $db->query($sql);
			while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			{
				$type = $row['itemType'];
				$info = array('id' => $row['tacoFixinId'], 'name' => $row['name'], 'price' => (double)$row['price'], 'heatRating' => $row['heatRating']);
				$menu[$type][] = $info;
			}
			echo '{"menu": ' . json_encode($menu) . '}';
		}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}
*/

	// COMPLETE BUT NOT TESTED
	function getConnection() 
	{
		//SERVER
		$dbhost="127.0.0.1";
		//$dbpass="lablabs";

		//LOCAL
		//$dbhost="localhost";
		$dbpass="";
		
		$dbuser="root";
		$dbname="HelpMeOut";
		$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $dbh;
	}

?>