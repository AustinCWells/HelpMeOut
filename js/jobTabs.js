jQuery(function() {
jQuery( "#tabs" ).tabs();
});

window.addEventListener('load', function(event) {

console.log(userInfo);

//Loading 
$.getJSON("js/test.json",function(data){//"api/jobs" gets 500 internal server error
		console.log("Jobs: ");
		console.log(data);
		var tasks = data.tasks;

		var foodList = new Array();
		var laundryList = new Array();
		var groceriesList = new Array();
		var cleaningList = new Array();
		var ridesList = new Array();
		var techSupportList = new Array();
		var maintenanceList = new Array();
		var otherList = new Array();

		for(var i=0;i<tasks.length;i++) {
			if(tasks[i].category_id === 1)
				foodList.push(tasks[i]);
			if(tasks[i].category_id === 2)
				laundryList.push(tasks[i]);
			if(tasks[i].category_id === 3)
				groceriesList.push(tasks[i]);
			if(tasks[i].category_id === 4)
				cleaningList.push(tasks[i]);
			if(tasks[i].category_id === 5)
				ridesList.push(tasks[i]);
			if(tasks[i].category_id === 6)
				techSupportList.push(tasks[i]);
			if(tasks[i].category_id === 7)
				maintenanceList.push(tasks[i]);
			if(tasks[i].category_id === 8)
				otherList.push(tasks[i]);


		}

		for(var i=0;i<foodList.length;i++) {
			//{ "task_id":1 , "beggar_id":1 , "chooser_id":NULL , "short_description":"I NEED TO MAKE BIG ORDAH" , "notes":"blablabla1" , "price":5 , "category_id":1 , "negotiable":0 , "is_complete":0 },
			var html = '<div class="jobPost" id="foodPosting' + foodList[i].task_id + '"><p class="jobDesc">' + foodList[i].short_description + '</p><p class="jobPrice">' + "$" + foodList[i].price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/food.png' + '"></div></div>';
			$('#food').append(html);
		}
		if($('#food').html() === '') {
			$('#food').append(' 	Sorry, there are currently no jobs available in this category.');
		}

		for(var i=0;i<laundryList.length;i++) {
			//{ "task_id":1 , "beggar_id":1 , "chooser_id":NULL , "short_description":"I NEED TO MAKE BIG ORDAH" , "notes":"blablabla1" , "price":5 , "category_id":1 , "negotiable":0 , "is_complete":0 },
			var html = '<div class="jobPost" id="laundryPosting' + laundryList[i].task_id + '"><p class="jobDesc">' + laundryList[i].short_description + '</p><p class="jobPrice">' + "$" + laundryList[i].price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/laundry2.png' + '"></div></div>';
			$('#laundry').append(html);
		}
		if($('#laundry').html() === '') {
			$('#laundry').append('Sorry, there are currently no jobs available in this category.');
		}

		for(var i=0;i<groceriesList.length;i++) {
			//{ "task_id":1 , "beggar_id":1 , "chooser_id":NULL , "short_description":"I NEED TO MAKE BIG ORDAH" , "notes":"blablabla1" , "price":5 , "category_id":1 , "negotiable":0 , "is_complete":0 },
			var html = '<div class="jobPost" id="groceriesPosting' + groceriesList[i].task_id + '"><p class="jobDesc">' + groceriesList[i].short_description + '</p><p class="jobPrice">' + "$" + groceriesList[i].price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/groceries.png' + '"></div></div>';
			$('#groceries').append(html);
		}
		if($('#groceries').html() === '') {
			$('#groceries').append('Sorry, there are currently no jobs available in this category.');
		}

		for(var i=0;i<cleaningList.length;i++) {
			//{ "task_id":1 , "beggar_id":1 , "chooser_id":NULL , "short_description":"I NEED TO MAKE BIG ORDAH" , "notes":"blablabla1" , "price":5 , "category_id":1 , "negotiable":0 , "is_complete":0 },
			var html = '<div class="jobPost" id="cleaningPosting' + cleaningList[i].task_id + '"><p class="jobDesc">' + cleaningList[i].short_description + '</p><p class="jobPrice">' + "$" + cleaningList[i].price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/cleaning.png' + '"></div></div>';
			$('#cleaning').append(html);
		}
		if($('#cleaning').html() === '') {
			$('#cleaning').append('Sorry, there are currently no jobs available in this category.');
		}

		for(var i=0;i<ridesList.length;i++) {
			//{ "task_id":1 , "beggar_id":1 , "chooser_id":NULL , "short_description":"I NEED TO MAKE BIG ORDAH" , "notes":"blablabla1" , "price":5 , "category_id":1 , "negotiable":0 , "is_complete":0 },
			var html = '<div class="jobPost" id="ridesPosting' + ridesList[i].task_id + '"><p class="jobDesc">' + ridesList[i].short_description + '</p><p class="jobPrice">' + "$" + ridesList[i].price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/rides.png' + '"></div></div>';
			$('#rides').append(html);
		}
		if($('#rides').html() === '') {
			$('#rides').append('Sorry, there are currently no jobs available in this category.');
		}

		for(var i=0;i<techSupportList.length;i++) {
			//{ "task_id":1 , "beggar_id":1 , "chooser_id":NULL , "short_description":"I NEED TO MAKE BIG ORDAH" , "notes":"blablabla1" , "price":5 , "category_id":1 , "negotiable":0 , "is_complete":0 },
			var html = '<div class="jobPost" id="techSupportPosting' + techSupportList[i].task_id + '"><p class="jobDesc">' + techSupportList[i].short_description + '</p><p class="jobPrice">' + "$" + techSupportList[i].price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/techsupport.png' + '"></div></div>';
			$('#techSupport').append(html);
		}
		if($('#techSupport').html() === '') {
			$('#techSupport').append('Sorry, there are currently no jobs available in this category.');
		}

		for(var i=0;i<maintenanceList.length;i++) {
			//{ "task_id":1 , "beggar_id":1 , "chooser_id":NULL , "short_description":"I NEED TO MAKE BIG ORDAH" , "notes":"blablabla1" , "price":5 , "category_id":1 , "negotiable":0 , "is_complete":0 },
			var html = '<div class="jobPost" id="maintenancePosting' + maintenanceList[i].task_id + '"><p class="jobDesc">' + maintenanceList[i].short_description + '</p><p class="jobPrice">' + "$" + maintenanceList[i].price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/maintenance.png' + '"></div></div>';
			$('#maintenance').append(html);
		}
		if($('#maintenance').html() === '') {
			$('#maintenance').append('Sorry, there are currently no jobs available in this category.');
		}

		for(var i=0;i<otherList.length;i++) {
			//{ "task_id":1 , "beggar_id":1 , "chooser_id":NULL , "short_description":"I NEED TO MAKE BIG ORDAH" , "notes":"blablabla1" , "price":5 , "category_id":1 , "negotiable":0 , "is_complete":0 },
			var html = '<div class="jobPost" id="otherPosting' + otherList[i].task_id + '"><p class="jobDesc">' + otherList[i].short_description + '</p><p class="jobPrice">' + "$" + otherList[i].price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/other.png' + '"></div></div>';
			$('#other').append(html);
		}
		if($('#other').html() === '') {
			$('#other').append('Sorry, there are currently no jobs available in this category.');
		}



		$(".currentJob").hover(
		function(){
			var height = $(this).children(".jobImage").height();
			var width = $(this).children(".jobImage").width();
			$(this).children(".overlay").height(height);
			$(this).children(".overlay").width(width);
			console.log("HI");
		},
		function(){
			$(this).children(".overlay").height(0);
			$(this).children(".overlay").width(0);
		});


  });


	function getRandomInt(min, max) {
 		 return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var random = getRandomInt(0,6);
	$('#randomText').empty();
	if (random === 0)
		$('#randomText').append('"HELP WILL ALWAYS BE GIVEN AT HOGWARTS, HARRY, TO THOSE WHO ASK FOR IT." - ALBUS DUMBLEDORE');
	else if (random === 1)
		$('#randomText').append('"WON\'T YOU PLEASE, PLEASE HELP ME, HELP ME, HELP ME, OOH" - THE BEATLES. "HELP!"');
	else if (random === 2)
		$('#randomText').append('"IF YOU CAN, HELP OTHERS; IF YOU CANNOT DO THAT, AT LEAST DO NOT HARM THEM." - DALAI LAMA XIV');
	else if (random === 3)
		$('#randomText').append('"LIFE\'S MOST PERSISTENT AND URGENT QUESTION IS, \'WHAT ARE YOU DOING FOR OTHERS?\'" - MARTIN LUTHER KING JR.');
	else if (random === 4)
		$('#randomText').append('"LET EACH OF YOU LOOK NOT ONLY TO HIS OWN INTERESTS, BUT ALSO TO THE INTERESTS OF OTHERS." - PHILIPPIANS 2:4');
	else if (random === 5)
		$('#randomText').append('"HELP ME... HELP YOU. HELP ME, HELP YOU." - JERRY MAGUIRE (1996)');
	else if (random === 6)
		$('#randomText').append('"THINGS DON\'T HAVE TO CHANGE THE WORLD TO BE IMPORTANT." - THE LATE, GREAT STEVE (YOBS) JOBS');

/*
	for(var i=1;i<getRandomInt(2,13);i++) {
		var html = '<div class="jobPost" id="foodPosting' + i+ '"><p class="jobDesc">' + "I AM HUNGRY" + '</p><p class="jobPrice">' + "$" + getRandomInt(2,9) + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/food.png' + '"></div></div>';
		$('#food').append(html);
	}
	if($('#food').html() === '') {
		$('#food').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<getRandomInt(2,13);i++) {
		var html = '<div class="jobPost" id="laundryPosting' + i + '"><p class="jobDesc">' + "WASH MY SOCKS" + '</p><p class="jobPrice">' + "$" + getRandomInt(2,9) + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/laundry2.png' + '"></div></div>';
		$('#laundry').append(html);
	}
	if($('#laundry').html() === '') {
		$('#laundry').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<getRandomInt(2,13);i++) {
		var html = '<div class="jobPost" id="groceriesPosting' + i + '"><p class="jobDesc">' + "KROGER RUN 4 ME" + '</p><p class="jobPrice">' + "$" + getRandomInt(2,9) + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/groceries.png' + '"></div></div>';
		$('#groceries').append(html);
	}
	if($('#groceries').html() === '') {
		$('#groceries').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<getRandomInt(2,13);i++) {
		var html = '<div class="jobPost" id="cleaningPosting' + i + '"><p class="jobDesc">' + "MY BATHROOM STAAANKS" + '</p><p class="jobPrice">' + "$" + getRandomInt(2,9) + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/cleaning.png' + '"></div></div>';
		$('#cleaning').append(html);
	}
	if($('#cleaning').html() === '') {
		$('#cleaning').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<getRandomInt(2,13);i++) {
		var html = '<div class="jobPost" id="ridesPosting' + i + '"><p class="jobDesc">' + "DUDE WHERE'S MY CAR" + '</p><p class="jobPrice">' + "$" + getRandomInt(2,9) + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/rides.png' + '"></div></div>';
		$('#rides').append(html);
	}
	if($('#rides').html() === '') {
		$('#rides').append('Sorry, there are currently no jobs available in this category.');
	}

	var titles = ['','I DON\'T KNOW HOW TO COMPUTER', 'NEW WIFI ROUTER, NEED HELP SETTING UP','MYSQL DATABASE HELP!!!!','I CAN\'T CONNECT TO THE INTERNET', 'HELP ME SET UP A FACEBOOK ACCOUNT', 'TROUBLES WITH JAVASCRIPT']

	for(var i=1;i<7;i++) {
		var html = '<div class="jobPost" id="techSupportPosting' + i + '"><p class="jobDesc">' + titles[i] + '</p><p class="jobPrice">' + "$" + getRandomInt(2,9) + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/techsupport.png' + '"></div></div>';
		$('#techSupport').append(html);
	}
	if($('#rides').html() === '') {
		$('#techSupport').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<getRandomInt(2,13);i++) {
		var html = '<div class="jobPost" id="maintenancePosting' + i + '"><p class="jobDesc">' + "FIX MY COTTON CANDY MAKER" + '</p><p class="jobPrice">' + "$" + getRandomInt(2,9) + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/maintenance.png' + '"></div></div>';
		$('#maintenance').append(html);
	}
	if($('#rides').html() === '') {
		$('#maintenance').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<getRandomInt(2,13);i++) {
		var html = '<div class="jobPost" id="otherPosting' + i + '"><p class="jobDesc">' + "NEED A CLOWN FOR A BIRTHDAY PARTY" + '</p><p class="jobPrice">' + "$" + getRandomInt(2,9) + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/other.png' + '"></div></div>';
		$('#other').append(html);
	}
	if($('#rides').html() === '') {
		$('#other').append('Sorry, there are currently no jobs available in this category.');
	}

*/
var myObject = new Object();
myObject.num_tasks = 8;

console.log(myObject);

$.getJSON("api/recentTasks", myObject, function(data2){
	console.log("Recent Jobs: ");
	console.log(data2);

	var check = Object.keys(data2)[0];

	console.log(check);

	if(check === "error")
		console.log(data2.error.text);

	else{

		var recentTasks = data2.tasks;

		console.log(recentTasks);

		for(var i=1;i<recentTasks.length;i++) {
			console.log("yo");
			var html = '<div class="jobPost" id="recentPosting' + i + '"><p class="jobDesc">' + recentTasks.short_description + '</p><p class="jobPrice">' + "$" + recentTasks.price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + 'img/jobs.png' + '" width="150px" height="150px"></div></div>';
			$('#recentJobs').append(html);
		}
		if($('#recentJobs').html() === '') {
			$('#recentJobs').append('Sorry, there are no recent jobs.<br><img id="stevie" src="img/jobs.png">');
		}
	}

});






}, false);