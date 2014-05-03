$(document).ready(function(){
 	if(!checkLogin())
 		window.location = "index.php";
});
$(window).ready(function(event) {

	$("#navMyJobs").addClass("currentPage").removeClass("hoverable");
	
	var accordionLeft = $('#accordionLeft');
	var accordionRight = $('#accordionRight');

	console.log("sent:");
	console.log({user_id: userInfo.userID});
	var json = {};
	json.user_id = userInfo.userID;

	var url = "api/tasksImDoing";

	$.ajax({
        type: "Post",
        url: url,
        data: JSON.stringify(json), //Data to POST to the server
        content: 'application/json',
        success: function (data) { 
			console.log('Job\'s I\'m Doing: ');
			//console.log(JSON.parse(data));

			var tasks = JSON.parse(data);
			console.log(tasks);
			//console.log(accordionLeft.html());

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
				var html = 	'<h3>' + tasks[i].beggar_fName + ': ' + tasks[i].short_description + '</h3><div><div class="row"><img class="jobPic three columns" src="' + image + '"><div class="jobContactInfo seven columns">Name: ' + tasks[i].beggar_fName + ' ' + tasks[i].beggar_lName + '<br>Phone: ' + tasks[i].contact_number + '<br>Email: ' + tasks[i].contact_email + '<br>Location: ' + tasks[i].location + '<br><br>End Time:</span> ' + tasks[i].time_frame_time + ' on ' + tasks[i].time_frame_date + '</div><div class="seperator"></div><div class="three columns"><div class="smallText">' + tasks[i].beggar_fName + ' has offered you:</div><br><div class="jobDashPrice left">$' + tasks[i].price + '</div></div></div><div class = "row"><div class="jobNotes twelve columns"><p class="notesHeader">Notes:</p>' + tasks[i].notes + '</div></div><div class = "row"><input type="button" class="cancelCenter five column center" id="cancelCenter' + tasks[i].task_id + '" data-task="' + tasks[i].task_id + '"" value="Cancel Job"></div></div>';
				accordionLeft.append(html);
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
						        	console.log(data);
						        	location.reload();
								}
							});
						});
				}
			}

			//Section: Jobs I'm Doing - Help offered
			// for(var i=0;i<tasks.length;i++) {
			// 	var html = 	'<h3>Help offered to: ' + tasks[i].beggar_id + '</h3><div><div class = "row"><span class = "bidHeader twelve column center">You have requested to complete *beggar_name*\'s job: ' + tasks[i].short_description + '</span></div><div class="row"><img class="jobPic three columns" src="' + 'img/food.png' + '"><div class="jobContactInfo seven columns">Name: ' + '*first_name*' + ' ' + '*last_name*' + '<br><br><span class="smallText">Start Time:</span> ' + '*start_time*' + ' <span class="smallText">End Time:</span> ' + '*end_time*' + '</div><div class="seperator"></div><div class="three columns"><div class="smallText">' + tasks[i].beggar_id + ' has offered you:</div><br><div class="jobDashPrice left">$' + tasks[i].price + '</div></div></div><div class = "row"><div class="jobNotes twelve columns"><p class="notesHeader">Notes:</p>' + tasks[i].notes + '</div></div><div class = "row center"><input type="button" class="cancelJob five center" value="Cancel Request"></div></div>';
			// 	accordionLeft.append(html);
			// }

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


		/*
		for(var i=0;i<jobsList.length;i++) {
			if(i===0) {
				accordionRight.empty();
			}
			var profileHTML = '<div class="ratingDiv">Overall Rating:<br><br><span class="ratingLabel"></span><div class="barArea"><div class="ratingBg" ></div><div class="ratingFg"></div></div></div>';
			var html = '<h3>Job Request From: ' + 'Wilson Wilson' + '</h3><div><p class="jobHeader">' + 'Wilson Wilson' + ' has requested to complete your task: "' + 'Clean my shoes, please' + '"<br><img class="jobPic" src="' + 'img/food.png' + '"><div class="jobContactInfo">' + 'Name: ' + 'Wilson Wilson' + '<br>Jobs Completed: ' + 'OVER9000!' + '</div><div class="jobDashPrice right">' + 'Offered Price:<br>$' + '5' + '</div><br><div class="jobProfile">' + profileHTML + '</div><input type="button" class="acceptButton leftButton" value="Accept"><input type="button" class="declineButton rightButton" value="Decline"</div>';
			accordionRight.append(html);

		}
		*/




	var urlRight = "api/getMyTasksAndPendingOffers/" + userInfo.userID;
	$.ajax({
        type: "Get",
        url: urlRight,
        success: function (data) { 
			console.log('Job\'s tasks[i].task_id Need Done:');

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
						var html = 	'<h3>Help for: ' + tasks[i].short_description + '</h3><div><div class="row"><img class="jobPic three columns" src="' + image + '"><div class="jobContactInfo seven columns">' + 'Category: ' + categoryFormatted + '<br>Location: ' + tasks[i].location + '<br><br><span class="smallText">Posted:</span> ' + tasks[i].date_posted + '<br><span class="smallText">End Time:</span> ' + tasks[i].time_frame_time + ' on ' + tasks[i].time_frame_date + '</div><div class="seperator"></div><div class="three columns"><div class="smallText">You offered:</div><br><div class="jobDashPrice left">$' + tasks[i].price + '</div></div></div><div class = "row"><div class="jobNotes twelve columns"><p class="notesHeader">Notes:</p>' + tasks[i].notes + '</div></div><div class = "row center"><input type="button" class="cancelCenter five columns"  id="cancelRight' + tasks[i].task_id + '" data-task="' + tasks[i].task_id + '"" value="Cancel Job"></div></div>';
						accordionRight.append(html);
						var CancelButton = document.getElementById("cancelRight" + tasks[i].task_id);
						CancelButton.onclick = function(e) {
							// console.log("can sell");
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
						var html = 	'<h3>' + tasks[i].chooser_fName + ' is completing: ' + tasks[i].short_description + '</h3><div><div class="row"><img class="jobPic three columns" src="' + image + '"><div class="jobContactInfo seven columns">' + 'Helper: ' + tasks[i].chooser_fName + tasks[i].chooser_lName + '<br>Email: ' + tasks[i].contact_email + '<br>Phone: ' + tasks[i].contact_phone + '<br><br>Category: ' + categoryFormatted + '<br>Location: ' + tasks[i].location + '<br><br><span class="smallText">Posted:</span> ' + tasks[i].date_posted + '<br><span class="smallText">End Time:</span> ' + tasks[i].time_frame_time + ' on ' + tasks[i].time_frame_date + '</div><div class="seperator"></div><div class="three columns"><div class="smallText">You offered ' + tasks[i].chooser_fName + ':</div><br><div class="jobDashPrice left">$' + tasks[i].price + '</div></div></div><div class = "row"><div class="jobNotes twelve columns"><p class="notesHeader">Notes:</p>' + tasks[i].notes + '</div></div><div class = "row center"><input type="button" class="jobCompleted five columns" id="completeRight' + tasks[i].task_id + '" data-task="' + tasks[i].task_id + '"" "  value="Job Completed"><input type="button" class="cancelJob five columns"  id="cancelRight' + tasks[i].task_id + '" data-task="' + tasks[i].task_id + '"" value="Cancel Job"></div></div>';
						accordionRight.append(html);
						var CompleteButton = document.getElementById("completeRight" + tasks[i].task_id);
						var CancelButton = document.getElementById("cancelRight" + tasks[i].task_id);
						CompleteButton.onclick = function(e) {
							openModal("#jobCompleteModal");
							$("#jobCompleteForm").submit(function(event){
								event.preventDefault();
								var overall = $('input[name=overallRating]:checked').val();
								var speed = $('input[name=speedRating]:checked').val();
								closeModal("#jobCompleteModal");
								var task = $(CompleteButton).data("task");
								var url = "api/completeTask/" + tasks[task].task_id + "," + overall + "," + speed;
								$.ajax({
							        type: "Get",
							        url: url,
							        success: function (data) { 
							        	console.log(data);
							        	location.reload();
									}
								});
							});
						}
						CancelButton.onclick = function(e) {
							openModal("#cancelJobModal");

							// console.log("can sell");
							// console.log($(CancelButton).data("task"));
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
							        	console.log(data);
							        	location.reload();
									}
								});
								});
						}
					}
				}
				else {
					var overallHTML = '<div class="starRating"><div><div><div><div><input id="overallRating1-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="overallRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="1" disabled="true"><label for="overallRating1-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>1</span></label></div><input id="overallRating2-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="overallRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="2" disabled="true"><label for="overallRating2-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>2</span></label></div><input id="overallRating3-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="overallRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="3" disabled="true"><label for="overallRating3-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>3</span></label></div><input id="overallRating4-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="overallRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="4" disabled="true"><label for="overallRating4-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>4</span></label></div><input id="overallRating5-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="overallRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="5" disabled="true"><label for="overallRating5-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>5</span></label></div>';
					var speedHTML = '<div class="starRating"><div><div><div><div><input id="speedRating1-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="speedRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="1" disabled="true"><label for="speedRating1-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>1</span></label></div><input id="speedRating2-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="speedRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="2" disabled="true"><label for="speedRating2-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>2</span></label></div><input id="speedRating3-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="speedRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="3" disabled="true"><label for="speedRating3-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>3</span></label></div><input id="speedRating4-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="speedRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="4" disabled="true"><label for="speedRating4-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>4</span></label></div><input id="speedRating5-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" type="radio" name="speedRating' + tasks[i].chooser_id + '-' + tasks[i].task_id + '" value="5" disabled="true"><label for="speedRating5-' + tasks[i].chooser_id + '-' + tasks[i].task_id + '"><span>5</span></label></div>';
					var html = 	'<h3>' + tasks[i].chooser_fName + ' has offered Help!</h3><div><div class = "row"><span class = "bidHeader twelve column center">' + tasks[i].chooser_fName + ' has requested to complete your job: ' + tasks[i].short_description + '</span></div><div class="row"><img class="jobPic three columns" src="' + image + '"><div class="jobContactInfo seven columns">Name: ' + tasks[i].chooser_fName + ' ' + tasks[i].chooser_lName + '<br><br><span class="smallText">Posted:</span> ' + tasks[i].date_posted + '</div><div class="seperator"></div><div class="three columns"><div class="smallText">You offered ' + tasks[i].chooser_fName + ':</div><br><div class="jobDashPrice left">$' + tasks[i].price + '</div></div></div><div class = "row"><div class = "six column ratingDiv center">Overall Rating:<div class="row">' + overallHTML + '</div></div><div class = "six column ratingDiv center">Speed Rating:<div class="row">' + speedHTML + '</div></div></div><div class = "row center"><input type="button" class="accept five columns" id="accept' + tasks[i].task_id + '" data-task="' + tasks[i].task_id + '" value="Accept"><input type="button" class="decline five columns" id="decline' + tasks[i].task_id + '" data-task="' + tasks[i].task_id + '"" value="Decline"></div></div>';
					accordionRight.append(html);
					var radiobtn;
					if(tasks[i].chooser_reliability >= 80) {
						radiobtn = document.getElementById("overallRating5-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					if(tasks[i].chooser_reliability >= 60 && tasks[i].chooser_reliability < 80) {
						radiobtn = document.getElementById("overallRating4-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					if(tasks[i].chooser_reliability >= 40 && tasks[i].chooser_reliability < 60) {
						radiobtn = document.getElementById("overallRating3-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					if(tasks[i].chooser_reliability >= 20 && tasks[i].chooser_reliability < 40) {
						radiobtn = document.getElementById("overallRating2-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
					}
					if(tasks[i].chooser_reliability < 20) {
						radiobtn = document.getElementById("overallRating1-" + tasks[i].chooser_id + '-' + tasks[i].task_id);
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
						// console.log("acccept");
						// console.log($(AcceptButton).data("task"));
						var task = $(AcceptButton).data("task");

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
						// console.log("decccline");
						// console.log($(DeclineButton).data("task"));
						var task = $(DeclineButton).data("task");

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