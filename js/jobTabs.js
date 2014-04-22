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
	.fail(function(){
	   console.log("Failed to load jobs.");
	});


	$.getJSON("api/recentTasks/"+num_tasks, function(data2){
		console.log("Recent Jobs: ");
		console.log(data2);

		for(var i=0;i<data2.length;i++) {
			constructRecentJob(data2[i]);
		}

	})
	.fail(function(){
	   console.log("Failed to load recent jobs.");
	});

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

	$("#modalOverlay").click(function(){
		$(".modal").hide();
		$(".modalOverlay").height(0);
		$("#modalOverlay").removeClass("modalOverlay");
	});

});

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

	/*

	'<div class="jobPost">
		<p class="jobDesc">' + job.short_description + '</p>
		<p class="jobPrice">' + "$" + job.price + '</p>
		<div class = "currentJob">
			<div class = "overlay"></div>
			<img class="jobImage" src="' + image + '">
		</div>
	</div>'


	*/


	var html = '<div class="jobPost"><p class="jobDesc">' + job.short_description + '</p><p class="jobPrice">' + "$" + job.price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + image + '"></div><input class = "jobInfo" type = "hidden" value = "' + JSON.stringify(job) + '"</div>';
	$('#' + category).append(html);


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
	
	var html = '<div class="jobPost" id="recentPosting' + job.task_id + '" data-num="' + job.task_id + '"><p class="jobDesc">' + job.short_description + '</p><p class="jobPrice">' + "$" + job.price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + image + '"></div></div>';
	$('#recentJobs').append(html);

	var hidden = '<div class="jobModal modal" id="recentModal' + job.task_id + '"><div class="modalTitle yellow">' + job.short_description + '<button type = "button" class = "closeButton"><span>X</span></button><div class = "clear"></div></div><div class="row"><img class="three column jobIcon" src="' + image + '"><div class="eight column jobModalNotes">Notes: ' + job.notes + '<br>You\'ll make: $' + job.price + '<br>Category: ' + categoryFormatted + '</div></div><div class="row"><div class="twelve column jobContact">Name: ' + job.first_name + ' ' + job.last_name + '<br>Location: ' + job.location + '<br><br><span class="smallText">End Time:</span> ' + job.time_frame_time + ' on ' + job.time_frame_date + '</div></div><div class="row center"><input type="button" class="requestJob" value="Offer Help"></div></div>';	
	$("#contentArea").append(hidden);

	var posting = "#" + "recentPosting" + job.task_id;
	$(posting).click(
	function(){
		var pop = "#" + "recentModal" + $(this).data("num");
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