$(document).ready(function(){
 	if(!checkLogin())
 		window.location = "index.php";
});
$(window).ready(function(event) {

	$("#navMyJobs").addClass("currentPage").removeClass("hoverable");
	
	var accordionLeft = $('#accordionLeft');
	var accordionRight = $('#accordionRight');

	var json = {};
	json.user_id = userInfo.userID;

	var url = "api/tasksImDoing";

	$.ajax({
        type: "Post",
        url: url,
        data: JSON.stringify(json), //Data to POST to the server
        content: 'application/json',
        success: function (data) { 

			var tasks = JSON.parse(data);
			//LEFT
			//Section: Jobs I'm Doing - In progress	
			for(var i=0;i<tasks.length;i++) {
				if(tasks[i].location==="")
					tasks[i].location = "unspecified.";

					var category;
					var categoryFormatted;
					var image;
					if(tasks[i].category_id === 1) {
						category = "food";
						categoryFormatted = "Food";
						image = "img/food.png";
					}
					else if(tasks[i].category_id === 2) {
						category = "rides";
						categoryFormatted = "Rides";
						image = "img/rides.png";
					}
					else if(tasks[i].category_id === 3) {
						category = "groceries";
						categoryFormatted = "Groceries";
						image = "img/groceries.png";
					}
					else if(tasks[i].category_id === 4) {
						category = "cleaning";
						categoryFormatted = "Cleaning";
						image = "img/cleaning.png";
					}
					else if(tasks[i].category_id === 5) {
						category = "laundry";
						categoryFormatted = "Laundry";
						image = "img/laundry2.png";
					}
					else if(tasks[i].category_id === 6) {
						category = "maintenance";
						categoryFormatted = "Maintenance";
						image = "img/maintenance.png";
					}
					else if(tasks[i].category_id === 7) {
						category = "techSupport";
						categoryFormatted = "techSupport";
						image = "img/techsupport.png";
					}
					else if(tasks[i].category_id === 8) {
						category = "other";
						categoryFormatted = "Other";
						image = "img/other.png";
					}
				tasks[i].contact_number = phoneFormat(tasks[i].contact_number);
				var html = 	'<h3>' + tasks[i].beggar_fName + ': ' + tasks[i].short_description + '</h3><div><div class="row"><img class="jobPic three columns" src="' + image + '" id="pic' + tasks[i].task_id + '"><div class="jobContactInfo seven columns">Name: ' + tasks[i].beggar_fName + ' ' + tasks[i].beggar_lName + '<br>Phone: ' + tasks[i].contact_number + '<br>Email: ' + tasks[i].contact_email + '<br>Location: ' + tasks[i].location + '<br><br>End Time:</span> ' + tasks[i].time_frame_date + " " + tasks[i].time_frame_time + '</div><div class="seperator"></div><div class="three columns"><div class="smallText center">' + tasks[i].beggar_fName + ' has offered you:</div><br><div class="jobDashPrice">$' + tasks[i].price + '</div></div></div><div class = "row"><div class="jobNotes twelve columns"><p class="notesHeader">Notes:</p>' + tasks[i].notes + '</div></div><div class = "row"><input type="button" class="cancelCenter five column center" id="cancelCenter' + tasks[i].task_id + '" data-task="' + tasks[i].task_id + '"" value="Cancel Job"></div></div>';
				accordionLeft.append(html);

				var isCustom;
				var imagePath;
				var userJSON = {};
				userJSON.user_id = tasks[i].beggar_id;

				var taskID = tasks[i].task_id;
				$.ajax({
					type: 'POST',
					url: "api/useraccount",
					content: 'application/json',
					data: JSON.stringify(userJSON),
					success: function(data){
						var superData = JSON.parse(data);
						console.log(superData);
						console.log(superData.is_custom);
						isCustom = superData.is_custom;
						imagePath = superData.custom_image_path;
						if(isCustom === 0) {
							//Do nothing
						}
						else {
							console.log("hello: " + imagePath);
							var imagePath = "img/user/" + imagePath;
							$('#pic' + taskID).attr("src", imagePath);
						}
					}
				});
				var CancelButton = document.getElementById("cancelCenter" + tasks[i].task_id);
				CancelButton.onclick = function(e) {
					openModal("#cancelJobModal");
						var task = $(CancelButton).data("task");

						$("#cancelJobForm").submit(function(event){
							event.preventDefault();
							closeModal("#cancelModal");
							var task = $(CancelButton).data("task");
							var url = "api/cancelTask/" + userInfo.userID + "," + task;
							$.ajax({
						        type: "Get",
						        url: url,
						        success: function (data) { 
						        	location.reload();
								}
							});
						});
				}
			}

			//empty message
			if(accordionLeft.html() === '') {
				accordionLeft.append('<div class="center">You have no jobs. Get started slacker!</div>');
			}
			else {
				//Build Accordion:
				$( "#accordionLeft" ).accordion({ heightStyle: "fill" , collapsible: true});
			}
		}
	});

	var urlRight = "api/getMyTasksAndPendingOffers/" + userInfo.userID;
	$.ajax({
        type: "Get",
        url: urlRight,
        success: function (data) { 

			var tasks = JSON.parse(data);
			console.log(tasks);

			//Section: Help I'm Getting - In progress
			for(var i=0;i<tasks.length;i++) {
				if(tasks[i].location==="")
					tasks[i].location = "unspecified.";

				var category;
				var categoryFormatted;
				var image;
				if(tasks[i].category_id === 1) {
					category = "food";
					categoryFormatted = "Food";
					image = "img/food.png";
				}
				else if(tasks[i].category_id === 2) {
					category = "rides";
					categoryFormatted = "Rides";
					image = "img/rides.png";
				}
				else if(tasks[i].category_id === 3) {
					category = "groceries";
					categoryFormatted = "Groceries";
					image = "img/groceries.png";
				}
				else if(tasks[i].category_id === 4) {
					category = "cleaning";
					categoryFormatted = "Cleaning";
					image = "img/cleaning.png";
				}
				else if(tasks[i].category_id === 5) {
					category = "laundry";
					categoryFormatted = "Laundry";
					image = "img/laundry2.png";
				}
				else if(tasks[i].category_id === 6) {
					category = "maintenance";
					categoryFormatted = "Maintenance";
					image = "img/maintenance.png";
				}
				else if(tasks[i].category_id === 7) {
					category = "techSupport";
					categoryFormatted = "techSupport";
					image = "img/techsupport.png";
				}
				else if(tasks[i].category_id === 8) {
					category = "other";
					categoryFormatted = "Other";
					image = "img/other.png";
				}

				if(tasks[i].is_offer_for_help === 0) {
					if(tasks[i].chooser_id === 0) {
						var html = 	'<h3>Help for: ' + tasks[i].short_description + '</h3><div><div class="row"><img class="jobPic three columns" src="' + image + '"><div class="jobContactInfo seven columns">' + 'Category: ' + categoryFormatted + '<br>Location: ' + tasks[i].location + '<br><br><span class="smallText">Posted:</span> ' + tasks[i].date_posted + '<br><span class="smallText">End Time:</span> ' + tasks[i].time_frame_date + " " + tasks[i].time_frame_time + '</div><div class="seperator"></div><div class="three columns"><div class="smallText center">You offered:</div><br><div class="jobDashPrice">$' + tasks[i].price + '</div></div></div><div class = "row"><div class="jobNotes twelve columns"><p class="notesHeader">Notes:</p>' + tasks[i].notes + '</div></div><div class = "row center"><input type="button" class="cancelCenter five columns"  id="cancelRight' + tasks[i].task_id + '" data-task="' + tasks[i].task_id + '"" value="Cancel Job"></div></div>';
						accordionRight.append(html);
						var CancelButton = document.getElementById("cancelRight" + tasks[i].task_id);
						CancelButton.onclick = function(e) {
							console.log($(CancelButton).data("task"));
							var task = $(CancelButton).data("task");

							var url = "api/cancelTask/" + userInfo.userID + "," + tasks[task].task_id;
							$.ajax({
						        type: "Get",
						        url: url,
						        success: function (data) { 
						        	console.log(data);
						        	location.reload();
								}
							});
						}
					}
					else {
						var html = 	'<h3>' + tasks[i].chooser_fName + ' is completing: ' + tasks[i].short_description + '</h3><div><div class="row"><img class="jobPic three columns" src="' + image + '" id="pic' + tasks[i].task_id + '"><div class="jobContactInfo seven columns">' + 'Helper: ' + tasks[i].chooser_fName + tasks[i].chooser_lName + '<br>Email: ' + tasks[i].contact_email + '<br>Phone: ' + tasks[i].contact_phone + '<br><br>Category: ' + categoryFormatted + '<br>Location: ' + tasks[i].location + '<br><br><span class="smallText">Posted:</span> ' + tasks[i].date_posted + '<br><span class="smallText">End Time:</span> ' + tasks[i].time_frame_date + " " + tasks[i].time_frame_time + '</div><div class="seperator"></div><div class="three columns"><div class="smallText center">You offered ' + tasks[i].chooser_fName + ':</div><br><div class="jobDashPrice">$' + tasks[i].price + '</div></div></div><div class = "row"><div class="jobNotes twelve columns"><p class="notesHeader">Notes:</p>' + tasks[i].notes + '</div></div><div class = "row center"><input type="button" class="jobCompleted five columns" id="completeRight' + tasks[i].task_id + '" data-task="' + tasks[i].task_id + '"" "  value="Job Completed"><input type="button" class="cancelJob five columns"  id="cancelRight' + tasks[i].task_id + '" data-task="' + tasks[i].task_id + '"" value="Cancel Job"></div></div>';
						accordionRight.append(html);
						var isCustom;
						var imagePath;
						var userJSON = {};
						userJSON.user_id = tasks[i].chooser_id;

						var taskID = tasks[i].task_id;
						$.ajax({
							type: 'POST',
							url: "api/useraccount",
							content: 'application/json',
							data: JSON.stringify(userJSON),
							success: function(data){
								var superData = JSON.parse(data);
								isCustom = superData.is_custom;
								imagePath = superData.custom_image_path;
								if(isCustom === 0) {
									//Do nothing
								}
								else {
									var imagePath = "img/user/" + imagePath;
									$('#pic' + taskID).attr("src", imagePath);
								}
							}
						});
						var CompleteButton = document.getElementById("completeRight" + tasks[i].task_id);
						var CancelButton = document.getElementById("cancelRight" + tasks[i].task_id);
						CompleteButton.onclick = function(e) {
							openModal("#jobCompleteModal");
							$("#jobCompleteForm").submit(function(event){
								event.preventDefault();
								var reliability = $('input[name=reliabilityRating]:checked').val();
								var speed = $('input[name=speedRating]:checked').val();
								closeModal("#jobCompleteModal");
								var task = $(CompleteButton).data("task");
								var url = "api/completeTask/" + task + "," + reliability + "," + speed;
								$.ajax({
							        type: "Get",
							        url: url,
							        success: function (data) { 
							        	location.reload();
									}
								});
							});
						}
						CancelButton.onclick = function(e) {
							openModal("#cancelJobModal");

							var task = $(CancelButton).data("task");

							$("#cancelJobForm").submit(function(event){
								event.preventDefault();
								closeModal("#cancelJobModal");
								var task = $(CancelButton).data("task");
								var url = "api/cancelTask/" + userInfo.userID + "," + task;
								$.ajax({
							        type: "Get",
							        url: url,
							        success: function (data) { 
							        	location.reload();
									}
								});
							});
						}
					}
				}
				else {
					var reliabilityHTML = '<div class="starRating"><div><div><div><div><input id="reliabilityRating1-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="reliabilityRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="1" disabled="true"><label for="reliabilityRating1-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>1</span></label></div><input id="reliabilityRating2-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="reliabilityRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="2" disabled="true"><label for="reliabilityRating2-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>2</span></label></div><input id="reliabilityRating3-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="reliabilityRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="3" disabled="true"><label for="reliabilityRating3-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>3</span></label></div><input id="reliabilityRating4-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="reliabilityRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="4" disabled="true"><label for="reliabilityRating4-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>4</span></label></div><input id="reliabilityRating5-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="reliabilityRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="5" disabled="true"><label for="reliabilityRating5-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>5</span></label></div>';
					var speedHTML = '<div class="starRating"><div><div><div><div><input id="speedRating1-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="speedRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="1" disabled="true"><label for="speedRating1-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>1</span></label></div><input id="speedRating2-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="speedRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="2" disabled="true"><label for="speedRating2-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>2</span></label></div><input id="speedRating3-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="speedRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="3" disabled="true"><label for="speedRating3-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>3</span></label></div><input id="speedRating4-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="speedRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="4" disabled="true"><label for="speedRating4-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>4</span></label></div><input id="speedRating5-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="speedRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="5" disabled="true"><label for="speedRating5-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>5</span></label></div>';
					var html = 	'<h3>' + tasks[i].chooser_fName + ' has offered Help!</h3><div><div class = "row"><span class = "bidHeader twelve column center">' + tasks[i].chooser_fName + ' has requested to complete your job: ' + tasks[i].short_description + '</span></div><div class="row"><img class="jobPic three columns" src="' + image + '"><div class="jobContactInfo seven columns">Name: ' + tasks[i].chooser_fName + ' ' + tasks[i].chooser_lName + '<br><br><span class="smallText">Posted:</span> ' + tasks[i].date_posted + '</div><div class="seperator"></div><div class="three columns"><div class="smallText center">You offered ' + tasks[i].chooser_fName + ':</div><br><div class="jobDashPrice">$' + tasks[i].price + '</div></div></div><div class = "row"><div class = "six column ratingDiv center">Reliability Rating:<div class="row">' + reliabilityHTML + '</div></div><div class = "six column ratingDiv center">Speed Rating:<div class="row">' + speedHTML + '</div></div></div><div class = "row center"><input type="button" class="accept five columns" id="accept' + tasks[i].task_id + '" data-task_num="' + i + '" value="Accept"><input type="button" class="decline five columns" id="decline' + tasks[i].task_id + '" data-task_num="' + i + '"" value="Decline"></div></div>';
					accordionRight.append(html);
					var radiobtn;
					if(tasks[i].chooser_reliability >= 80) {
						radiobtn = document.getElementById("reliabilityRating5-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					if(tasks[i].chooser_reliability >= 60 && tasks[i].chooser_reliability < 80) {
						radiobtn = document.getElementById("reliabilityRating4-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					if(tasks[i].chooser_reliability >= 40 && tasks[i].chooser_reliability < 60) {
						radiobtn = document.getElementById("reliabilityRating3-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					if(tasks[i].chooser_reliability >= 20 && tasks[i].chooser_reliability < 40) {
						radiobtn = document.getElementById("reliabilityRating2-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					if(tasks[i].chooser_reliability < 20) {
						radiobtn = document.getElementById("reliabilityRating1-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					radiobtn.checked = true;

					if(tasks[i].chooser_reliability >= 80) {
						radiobtn = document.getElementById("speedRating5-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					if(tasks[i].chooser_speed >= 60 && tasks[i].chooser_speed < 80) {
						radiobtn = document.getElementById("speedRating4-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					if(tasks[i].chooser_speed >= 40 && tasks[i].chooser_speed < 60) {
						radiobtn = document.getElementById("speedRating3-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					if(tasks[i].chooser_speed >= 20 && tasks[i].chooser_speed < 40) {
						radiobtn = document.getElementById("speedRating2-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					if(tasks[i].chooser_speed < 20) {
						radiobtn = document.getElementById("speedRating1-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					radiobtn.checked = true;

					var AcceptButton = document.getElementById("accept" + tasks[i].task_id);
					var DeclineButton = document.getElementById("decline" + tasks[i].task_id);
					AcceptButton.onclick = function(e) {
						var task = $(AcceptButton).data("task_num");
						console.log(task);

						var url = "api/acceptOffer/" + tasks[task].chooser_id + "," + tasks[task].task_id;
						$.ajax({
					        type: "Get",
					        url: url,
					        success: function (data) { 
					        	console.log(data);
					        	location.reload();
							}
						});
					}
					DeclineButton.onclick = function(e) {
						var task = $(DeclineButton).data("task_num");

						var url = "api/declineOffer/" + tasks[task].chooser_id + "," + tasks[task].task_id;
						$.ajax({
				        type: "Get",
				        url: url,
				        success: function (data) { 
				        	console.log(data);
				        	location.reload();
						}
					});
					}

				}
			}

					
			//empty message
			if(accordionRight.html() === '') {
				accordionRight.append('<div class="center">You have no help. Try harder!</div>');
			}
			else {
				//Build Accordion:
				$( "#accordionRight" ).accordion({ heightStyle: "fill", collapsible: true/*, active: false*/});
			}
		}
		
	});



function phoneFormat(phone) {
  phone = phone.replace(/[^0-9]/g, '');
  phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  return phone;
}

});