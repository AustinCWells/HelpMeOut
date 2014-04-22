jQuery(function() {
jQuery( "#tabs" ).tabs();
});

var sorry = 'Sorry, there are currently no jobs available in this category.';
var num_tasks = 8;

$(window).ready(function(event) {

	console.log(userInfo);

	//Loading 
	$.getJSON("api/tasks",function(data){

		console.log("Jobs: ");
		console.log(data);
		
		for(var keys in data){

			if(data[keys].length === 0)
				$("#" + keys).append(sorry);

			else {

				for( var info in data[keys]){
					//console.log(keys);
					constructJob(data[keys][info], keys);
				}
			}

		}

	})
	.done(callback)
	.fail(function(){
	   console.log("Failed to load jobs.");
	});


	$.getJSON("api/recentTasks/"+num_tasks, function(data){
		console.log("Recent Jobs: ");
		console.log(data);
		//console.log(JSON.stringify(data));

		for(var i=0; i<data.length; i++) {
			constructRecentJob(data[i]);
		}

	})
	.done(callback)
	.fail(function(){
	   console.log("Failed to load recent jobs.");
	});


});

var callback = function(){
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

	$(".jobPost").click(function(){
		alert("hello");
	});
}

var constructJob = function(job, categoryName) {
	var category = "";
	var categoryFormatted = "";
	var image = "";

	switch(categoryName){

		case "food":
			category = "food";
			categoryFormatted = "Food";
			image = "img/food.png"
			break;

		case "rides":
			category = "rides";
			categoryFormatted = "Rides";
			image = "img/rides.png";
			break;

		case "groceries":
			category = "groceries";
			categoryFormatted = "Groceries";
			image = "img/groceries.png";
			break;

		case "cleaning":
			category = "cleaning";
			categoryFormatted = "Cleaning";
			image = "img/cleaning.png";
			break;

		case "laundry":
			category = "laundry";
			categoryFormatted = "Laundry";
			image = "img/laundry2.png";
			break;

		case "maintenance":
			category = "maintenance";
			categoryFormatted = "Maintenance";
			image = "img/maintenance.png";
			break;

		case "techSupport":
			category = "techSupport";
			categoryFormatted = "Tech Support";
			image = "img/techsupport.png";
			break;

		case "other":
			category = "other";
			categoryFormatted = "Other";
			image = "img/other.png";
			break;

		default:
			return;

	}

	$('#' + category).append(getJobHTML(job, image));


	/*var posting = "#" + category + "Posting" + job.task_id;
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

			var offer = {};
			offer.task_id = job.task_id;
			offer.user_id = userInfo.userID;
			console.log(offer);

			$.ajax({
	        type: "POST",
	        url: "api/makeOffer",
	        data: JSON.stringify(offer), //Data to POST to the server
	        content: 'application/json',
	        success: function () { 
	        	console.log("success big boiii");
	        }

	       });
		});

		$(".closeButton").click(function(){
			$(".modal").hide();
			$(".modalOverlay").height(0);
			$("#modalOverlay").removeClass("modalOverlay");
			//TODO: send job request
		});

	});*/
}

var getJobHTML = function(job, image){
	return '<div class="jobPost"><p class="jobDesc">' + job.short_description + '</p><p class="jobPrice">' + "$" + job.price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + image + '"></div><input class = "jobInfo" type = "hidden" value = "' + JSON.stringify(job) + '"</div>';
}

function constructRecentJob(job) {
	var category = "";
	var categoryFormatted = "";
	var image = "";
	if(job.category_id === 1) {
		category = "food";
		categoryFormatted = "Food";
		image = "img/food.png";
	}
	else if(job.category_id === 2) {
		category = "rides";
		categoryFormatted = "Rides";
		image = "img/rides.png";
	}
	else if(job.category_id === 3) {
		category = "groceries";
		categoryFormatted = "Groceries";
		image = "img/groceries.png";
	}
	else if(job.category_id === 4) {
		category = "cleaning";
		categoryFormatted = "Cleaning";
		image = "img/cleaning.png";
	}
	else if(job.category_id === 5) {
		category = "laundry";
		categoryFormatted = "Laundry";
		image = "img/laundry2.png";
	}
	else if(job.category_id === 6) {
		category = "maintenance";
		categoryFormatted = "Maintenance";
		image = "img/maintenance.png";
	}
	else if(job.category_id === 7) {
		category = "techSupport";
		categoryFormatted = "techSupport";
		image = "img/techsupport.png";
	}
	else if(job.category_id === 8) {
		category = "other";
		categoryFormatted = "Other";
		image = "img/other.png";
	}
	
	$('#recentJobs').append(getJobHTML(job, image));



}