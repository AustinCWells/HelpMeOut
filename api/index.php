<?php
	
	require '../vendor/autoload.php';
	$app = new \Slim\Slim();

	$app->post('/login', 'login');
	$app->post('/newaccount', 'createAccount');
	$app->post('/paymentinfo', 'getPaymentInfo');
	$app->post('/placeorder', 'createOrder');
	$app->post('/lastorder', 'getLastOrder');
	$app->get('/locations', 'findTrucks');
	$app->get('/menu', 'getMenu');

	$app->run();

	// WORKING
	function login()
	{
		$app = \Slim\Slim::getInstance();
		$request = $app->request();
		$loginInfo = json_decode($request->getBody());
		$sql = "SELECT user_id, given_name, surname, email FROM Users WHERE email = :email and password = :password";
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

	// WORKING
	function createAccount()
	{
		$sql = "INSERT INTO Users (`given_name`, `surname`, `email`, `password`, `phone_no`, `credit_type`, `credit_no`)
		VALUES (:fname, :lname, :email, :password, :phonenumber, :creditcard, :ccnumber)";
		$app = \Slim\Slim::getInstance();
		$request = $app->request();
		$newAccount = json_decode($request->getBody());
		try 
		{
			if(isset($newAccount))
			{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam("fname", $newAccount->fname);
				$stmt->bindParam("lname", $newAccount->lname);
				$stmt->bindParam("email", $newAccount->email);
				$stmt->bindParam("password", md5($newAccount->password));
				$stmt->bindParam("phonenumber", $newAccount->phonenumber);
				$stmt->bindParam("ccnumber", $newAccount->ccnumber);
				$stmt->bindParam("creditcard", $newAccount->creditcard);
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

		$sql = "SELECT user_id, given_name, surname, email FROM Users WHERE email = :email and password = :password";

		try
		{
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("email", $newAccount->email);
			$stmt->bindParam("password", md5($newAccount->password));
			$stmt->execute();
			$userinfo = $stmt->fetch(PDO::FETCH_OBJ);
			$db = null;
			$response['info'] = $userinfo;
			echo json_encode($response);
		}
		catch(PDOException $e) 
		{
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}

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

	// WORKING
	function getConnection() 
	{
		$dbhost="127.0.0.1";
		$dbuser="root";
		$dbpass="root";
		$dbname="TacoTruck";
		$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $dbh;
	}

?>