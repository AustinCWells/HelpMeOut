jQuery(function() {
jQuery( "#tabs" ).tabs();
});

var sorry = 'Sorry, there are currently no jobs available in this category.';
var num_tasks = 8;
var isAll = false;
var isRecent = false;
$(document).ready(function(event) {

	//console.log(userInfo);

	//Loading 
	$.getJSON("api/tasks",function(data){

		//console.log("Jobs: ");
		//console.log(data);
		
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
	.done(function(){
		isAll = true;
		callback();
	})
	.fail(function(){
	   console.log("Failed to load jobs.");
	});


	$.getJSON("api/recentTasks/"+num_tasks, function(data){
		//console.log("Recent Jobs: ");
		//console.log(data);
		//console.log(JSON.stringify(data));

		for(var i=0; i<data.length; i++) {
			constructRecentJob(data[i]);
		}

	})
	.done(function(){
		isRecent = true;
		callback();
	})
	.fail(function(){
	   console.log("Failed to load recent jobs.");
	});


});

var callback = function(){

	if(isAll && isRecent){

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
			var info = $(this).children(".jobInfo").val();
			//info = JSON.parse(info);
			console.log(info);
			/*$("#modalCategory").text(info.category);
			$("#beggerName").text(info.first_name + " " + info.last_name);
			$("#jobDeadline").text(info.time_frame_date + " by " + info.time_frame_time);
			$("#modalDescription").text(info.short_description);
			$("#modalPayment").text("Pays: $" + (info.price));
			$("#modalLocation").text("Location: " + info.location);
			$("#modalNotes").text("Notes: " + info.notes);

			openModal("#jobModal");*/
		});
	}
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

	console.log(category);

	$('#' + category).append(getJobHTML(job, image));
	console.log($("#" + category +":last-child"));


	/*var posting = "#" + category + "Posting" + job.task_id;
	$(posting).click(
	function(){

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
	return '<div class="jobPost"><p class="jobDesc">' + job.short_description + '</p><p class="jobPrice">' + "$" + job.price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + image + '"></div><input class = "jobInfo" type = "hidden"</div>';
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
		categoryFormatted = "Tech Support";
		image = "img/techsupport.png";
	}
	else if(job.category_id === 8) {
		category = "other";
		categoryFormatted = "Other";
		image = "img/other.png";
	}

	else
		return;
	
	job.category = categoryFormatted;
	$('#recentJobs').append(getJobHTML(job, image));


}