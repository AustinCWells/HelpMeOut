jQuery(function() {
jQuery( "#tabs" ).tabs();
});

window.addEventListener('load', function(event) {

console.log(userInfo);

//Loading 
$.getJSON("api/tasks",function(data){//"api/jobs" gets 500 internal server error
		console.log("Jobs: ");
		console.log(data);
		var tasks = data;

		for(var i=0;i<tasks["foodDelivery"].length;i++) {
			constructJob(tasks["foodDelivery"][i], 1);
		}

		for(var i=0;i<tasks["laundry"].length;i++) {
			constructJob(tasks["laundry"][i], 2);
		}

		for(var i=0;i<tasks["groceries"].length;i++) {
			constructJob(tasks["groceries"][i], 3);
		}

		for(var i=0;i<tasks["cleaning"].length;i++) {
			constructJob(tasks["cleaning"][i], 4);
		}

		for(var i=0;i<tasks["rides"].length;i++) {
			constructJob(tasks["rides"][i], 5);
		}

		for(var i=0;i<tasks["techSupport"].length;i++) {
			constructJob(tasks["techSupport"][i], 6);
		}

		for(var i=0;i<tasks["maintenance"].length;i++) {
			constructJob(tasks["maintenance"][i], 7);
		}

		for(var i=0;i<tasks["other"].length;i++) {
			constructJob(tasks["other"][i], 8);
		}


		if($('#food').html() === '') {
			$('#food').append(' 	Sorry, there are currently no jobs available in this category.');
		}

		if($('#laundry').html() === '') {
			$('#laundry').append('Sorry, there are currently no jobs available in this category.');
		}

		if($('#groceries').html() === '') {
			$('#groceries').append('Sorry, there are currently no jobs available in this category.');
		}

		if($('#cleaning').html() === '') {
			$('#cleaning').append('Sorry, there are currently no jobs available in this category.');
		}

		if($('#rides').html() === '') {
			$('#rides').append('Sorry, there are currently no jobs available in this category.');
		}

		if($('#techSupport').html() === '') {
			$('#techSupport').append('Sorry, there are currently no jobs available in this category.');
		}

		if($('#maintenance').html() === '') {
			$('#maintenance').append('Sorry, there are currently no jobs available in this category.');
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
		},
		function(){
			$(this).children(".overlay").height(0);
			$(this).children(".overlay").width(0);
		});


  })
.fail(function(){
   console.log("Failed to load jobs.");
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


// var myObject = {};
// myObject.num_tasks = 8;

// console.log(myObject);

var num_tasks = 8;

$.getJSON("api/recentTasks/"+num_tasks, function(data2){
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

})
.fail(function(){
   console.log("Failed to load recent jobs.");
});

function constructJob(job, categoryId) {
	var category = "";
	var categoryFormatted = "";
	var image = "";
	if(categoryId === 1) {
		category = "food";
		categoryFormatted = "Food";
		image = "img/food.png";
	}
	else if(categoryId === 2) {
		category = "laundry";
		categoryFormatted = "Laundry";
		image = "img/laundry2.png";
	}
	else if(categoryId === 3) {
		category = "groceries";
		categoryFormatted = "Groceries";
		image = "img/groceries.png";
	}
	else if(categoryId === 4) {
		category = "cleaning";
		categoryFormatted = "Cleaning";
		image = "img/cleaning.png";
	}
	else if(categoryId === 5) {
		category = "rides";
		categoryFormatted = "Rides";
		image = "img/rides.png";
	}
	else if(categoryId === 6) {
		category = "techSupport";
		categoryFormatted = "Tech Support";
		image = "img/techsupport.png";
	}
	else if(categoryId === 7) {
		category = "maintenance";
		categoryFormatted = "Maintenance";
		image = "img/maintenance.png";
	}
	else if(categoryId === 8) {
		category = "other";
		categoryFormatted = "Other";
		image = "img/other.png";
	}
	
	var html = '<div class="jobPost" id="' + category + 'Posting' + job.task_id + '" data-num="' + job.task_id + '"><p class="jobDesc">' + job.short_description + '</p><p class="jobPrice">' + "$" + job.price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + image + '"></div></div>';
	$('#' + category).append(html);

	var hidden = '<div class="jobModal modal" id="' + category + 'Modal' + job.task_id + '"><div class="modalTitle yellow">' + job.short_description + '<button type = "button" class = "closeButton"><span>X</span></button><div class = "clear"></div></div><div class="row"><img class="three column jobIcon" src="' + image + '"><div class="eight column jobModalNotes">Notes: ' + job.notes + '<br>You\'ll make: $' + job.price + '<br>Category: ' + categoryFormatted + '</div></div><div class="row"><div class="twelve column jobContact">Name: ' + job.first_name + ' ' + job.last_name + '<br>Location: ' + job.location + '<br><br><span class="smallText">End Time:</span> ' + job.time_frame_time + ' on ' + job.time_frame_date + '</div></div><div class="row center"><input type="button" class="requestJob" value="Offer Help"></div></div>';	
	$("#contentArea").append(hidden);

	var posting = "#" + category + "Posting" + job.task_id;
	$(posting).click(
	function(){
		var pop = "#" + category + "Modal" + $(this).data("num");
		//openModal($(pop));
		var windowWidth = $(window).width() / 2;
		var windowHeight = $(window).height() / 2;
		//console.log(windowWidth);
		$(pop).show();
		$(pop).addClass("modalSelected");
		//var jobWidth = 12 + ($(pop + " form").width() / 2);
		//var jobHeight = 12 + ($(pop + " form").height() / 2);
		var jobWidth = 200;
		var jobHeight = 150;
		var left = windowWidth - jobWidth;
		var top = windowHeight - jobHeight;
		$(pop).css({"left": left, "top": top});

		$("#modalOverlay").addClass("modalOverlay");
		$(".modalOverlay").height($(document).height());

		$(".requestJob").click(function(){
			$(".modal").hide();
			$(".modalOverlay").height(0);
			$("#modalOverlay").removeClass("modalOverlay");
			//TODO: send job request
		});

		$(".closeButton").click(function(){
			$(".modal").hide();
			$(".modalOverlay").height(0);
			$("#modalOverlay").removeClass("modalOverlay");
			//TODO: send job request
		});

	});
}

$("#modalOverlay").click(function(){
	$(".modal").hide();
	$(".modalOverlay").height(0);
	$("#modalOverlay").removeClass("modalOverlay");
	});



}, false);