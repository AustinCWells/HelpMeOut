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

		for(var i=0;i<tasks.length;i++) {
			constructJob(tasks[i]);

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


var myObject = {};
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

})
.fail(function(){
   console.log("Failed to load recent jobs.");
});

function constructJob(job) {
	var category = "";
	var image = "";
	if(job.category_id === 1) {
		category = "food";
		image = "img/food.png";
	}
	else if(job.category_id === 2) {
		category = "laundry";
		image = "img/laundry2.png";
	}
	else if(job.category_id === 3) {
		category = "groceries";
		image = "img/groceries.png";
	}
	else if(job.category_id === 4) {
		category = "cleaning";
		image = "img/cleaning.png";
	}
	else if(job.category_id === 5) {
		category = "rides";
		image = "img/rides.png";
	}
	else if(job.category_id === 6) {
		category = "techSupport";
		image = "img/techsupport.png";
	}
	else if(job.category_id === 7) {
		category = "maintenance";
		image = "img/maintenance.png";
	}
	else if(job.category_id === 8) {
		category = "other";
		image = "img/other.png";
	}
	
	var html = '<div class="jobPost" id="' + category + 'Posting' + job.task_id + '" data-num="' + job.task_id + '"><p class="jobDesc">' + job.short_description + '</p><p class="jobPrice">' + "$" + job.price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + image + '"></div></div>';
	$('#' + category).append(html);

	var hidden = '<div class="jobModal modal" id="' + category + 'Modal' + job.task_id + '"><div class="modalTitle yellow">' + job.short_description + '<button type = "button" class = "closeButton"><span>X</span></button><div class = "clear"></div></div><div class="row"><img class="three column" src="' + image + '"><div class="nine column">' + job.notes + '</div></div><div class="row"><div class="twelve column">Name: ' + '*first_name*' + ' ' + '*last_name*' + '<br>Location: ' + '*location*' + '<br><br><span class="smallText">Start Time:</span> ' + '*start_time*' + ' <span class="smallText">End Time:</span> ' + '*end_time*' + '</div></div><div class="row center"><input type="button" class="requestJob" value="Offer Help"></div></div>';	
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