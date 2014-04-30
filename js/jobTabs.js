jQuery(function() {
jQuery( "#tabs" ).tabs();
});

var sorry = 'Sorry, there are currently no jobs available in this category.';
var num_tasks = 8;
var isAll = false;
var isRecent = false;

$(document).ready(function(event) {

	refreshAllJobs();

	refreshRecentJobs();


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
			info = JSON.parse(info);
			console.log(info);
			$("#jobModal .jobImage").attr("src", info.image);
			$("#modalCategory").text(info.category);
			$("#beggerName").text(info.first_name + " " + info.last_name);
			$("#jobDeadline").text(info.time_frame_date + " by " + info.time_frame_time);
			$("#modalDescription").text(info.short_description);
			$("#modalPayment").text("Pays: $" + (info.price));
			$("#modalLocation").text("Location: " + info.location);
			$("#modalNotes").text("Notes: " + info.notes);
			$("#modalTaskId").val(info.task_id);

			openModal("#jobModal");
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

	job.category = categoryFormatted;
	job.image = image;
	var text = $('#' + category).append(getJobHTML(job, image));
	$(text).children(":last-child").children(".jobInfo").val(JSON.stringify(job));

}

var getJobHTML = function(job, image){
	return '<div class="jobPost"><p class="jobDesc">' + job.short_description + '</p><p class="jobPrice">' + "$" + job.price + '</p><div class = "currentJob"><div class = "overlay"></div><img class="jobImage" src="' + image + '"></div><input class = "jobInfo" type = "hidden"></div>';
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
	job.image= image;
	var text = $('#recentJobs').append(getJobHTML(job, image));
	$(text).children(":last-child").children(".jobInfo").val(JSON.stringify(job));

}

var refreshAllJobs = function(){

	var user = {};

	if(checkLogin()){
		user.user_id = userInfo.userID;
		//console.log(user);
	}

	else {
		user.user_id = 0;
	}

	//console.log(user);

	$.ajax({
		type: 'POST',
		url: "api/tasks",
		content: 'application/json',
		data: JSON.stringify(user),
		success: function(data){

			var obj = JSON.parse(data);

			if(Object.keys(obj)[0] === "error"){
				
				obj.modal = "Error Downloading All Jobs!";
				displayError(obj);

			}

			else{

				for(var keys in obj){

					$("#" + keys).children().remove("div");

					if(obj[keys].length === 0)
						$("#" + keys).append(sorry);

					else {

						for( var info in obj[keys]){
							//console.log(keys);
							constructJob(obj[keys][info], keys);
						}
					}

				}

				isAll = true;
				callback();

			}

		},

		//CAN WE MAKE THIS ERROR MESSAGE MORE SPECIFIC?
		//IF THIS IS BECAUSE OF A BROKEN LINK BETWEEN
			//MODALS AND API, CAN WE MENTION THAT?

		error: function(data){
			alert("WE'RE SORRY SOMETHING WENT WRONG!");
		}

	});

	/*$.getJSON("api/tasks",function(data){

		for(var keys in data){

			$("#" + keys).children().remove("div");

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
	});*/

}

var refreshRecentJobs = function(){

	$("#recentJobs").children().remove("div");

	var request = {};
	request.num_tasks = num_tasks;

	if(checkLogin()){
		request.user_id = userInfo.userID;
	}

	else {
		request.user_id = 0;
	}

	//console.log(user);

	$.ajax({
		type: 'POST',
		url: "api/recentTasks",
		content: 'application/json',
		data: JSON.stringify(request),
		success: function(data){

			var obj = JSON.parse(data);

			if(Object.keys(obj)[0] === "error"){
				
				obj.modal = "Error Downloading Recent Jobs!";
				displayError(obj);

			}

			else{

				for(var i=0; i<obj.length; i++) {
					constructRecentJob(obj[i]);
				}

				isRecent = true;
				callback();

			}

		},

		//CAN WE MAKE THIS ERROR MESSAGE MORE SPECIFIC?
		//IF THIS IS BECAUSE OF A BROKEN LINK BETWEEN
			//MODALS AND API, CAN WE MENTION THAT?

		error: function(data){
			alert("WE'RE SORRY SOMETHING WENT WRONG!");
		}

	});

	/*if(checkLogin()){

	}

	else {

		$.getJSON("api/recentTasks/"+num_tasks, function(data){

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
	}*/

}