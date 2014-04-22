$(window).ready(function(event) {

	$("#navMyJobs").addClass("currentPage").removeClass("hoverable");
	
	var accordionLeft = $('#accordionLeft');
	var accordionRight = $('#accordionRight');

	console.log("sent:");
	console.log({user_id: userInfo.userID});
	var json = {user_id: userInfo.userID};

	var url = "api/tasksImDoing";

	
	$.ajax({
        type: "Post",
        url: url,
        data: json, //Data to POST to the server
        content: 'application/json',
        success: function (data) { 
			console.log('Job\'s I\'m Doing: ');
			//console.log(JSON.parse(data));

			var tasks = JSON.parse(data);
			console.log(tasks);
			//console.log(accordionLeft.html());

			//LEFT
			//Section: Jobs I'm Doing - In progress	
			// for(var i=0;i<tasks.length;i++) {
			// 	var html = 	'<h3>' + tasks[i].beggar_id + ': ' + tasks[i].short_description + '</h3><div><div class="row"><img class="jobPic three columns" src="' + 'img/food.png' + '"><div class="jobContactInfo seven columns">Name: ' + '*first_name*' + ' ' + '*last_name*' + '<br>Phone: ' + '*phone_number*' + '<br>Email: ' + '*email_address*' + '<br>Location: ' + '*location*' + '<br><br><span class="smallText">Start Time:</span> ' + '*start_time*' + ' <span class="smallText">End Time:</span> ' + '*end_time*' + '</div><div class="seperator"></div><div class="three columns"><div class="smallText">' + tasks[i].beggar_id + ' has offered you:</div><br><div class="jobDashPrice left">$' + tasks[i].price + '</div></div></div><div class = "row"><div class="jobNotes twelve columns"><p class="notesHeader">Notes:</p>' + tasks[i].notes + '</div></div><div class = "row center"><input type="button" class="cancelJob five columns" value="Cancel Job"><input type="button" class="jobCompleted five columns" value="Job Completed"></div></div>';
			// 	accordionLeft.append(html);
			// }

			//Section: Jobs I'm Doing - Help offered
			// for(var i=0;i<tasks.length;i++) {
			// 	var html = 	'<h3>Help offered to: ' + tasks[i].beggar_id + '</h3><div><div class = "row"><span class = "bidHeader twelve column center">You have requested to complete *beggar_name*\'s job: ' + tasks[i].short_description + '</span></div><div class="row"><img class="jobPic three columns" src="' + 'img/food.png' + '"><div class="jobContactInfo seven columns">Name: ' + '*first_name*' + ' ' + '*last_name*' + '<br><br><span class="smallText">Start Time:</span> ' + '*start_time*' + ' <span class="smallText">End Time:</span> ' + '*end_time*' + '</div><div class="seperator"></div><div class="three columns"><div class="smallText">' + tasks[i].beggar_id + ' has offered you:</div><br><div class="jobDashPrice left">$' + tasks[i].price + '</div></div></div><div class = "row"><div class="jobNotes twelve columns"><p class="notesHeader">Notes:</p>' + tasks[i].notes + '</div></div><div class = "row center"><input type="button" class="cancelJob five center" value="Cancel Request"></div></div>';
			// 	accordionLeft.append(html);
			// }

			//empty message
			if(accordionLeft.html() === '') {
				accordionLeft.append('You have no jobs. Get started slacker!');
			}


			//Build Accordion:
			$( "#accordionLeft" ).accordion({ heightStyle: "fill" , collapsible: true});

		}
	});


		var cancelList = document.getElementsByClassName("cancelJob");
		var completedList = document.getElementsByClassName("jobCompleted");

		for(var i=0;i<cancelList.length;i++) {
			$(cancelList[i]).click(function(event) {
				 console.log("cancel!");
				}
			);
			$(completedList[i]).click(function(event) {
				 console.log("job completed!");
				}
			);
		}

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

		loadRight();
		//$( "#accordionRight" ).accordion({ heightStyle: "fill" , collapsible: true});

		var acceptList = document.getElementsByClassName("acceptButton");
		var declineList = document.getElementsByClassName("declineButton");

		for(var i=0;i<acceptList.length;i++) {
			$(acceptList[i]).click(function(event) {
				 console.log("job accepted!");
				}
			);
			$(declineList[i]).click(function(event) {
				 console.log("job declined!");
				}
			);
		}





			//RIGHT

	function loadRight() {

		var urlRight1 = "api/getMyTasksAndPendingOffers/" + userInfo.userID;
		$.ajax({
	        type: "Get",
	        url: urlRight1,
	        success: function (data) { 
				console.log('Job\'s I Need Done:');

				var tasks = JSON.parse(data);
				console.log(tasks);


				//Section: Help I'm Getting - In progress
				for(var i=0;i<tasks.length;i++) {
					if(tasks[i].location==="")
						tasks[i].location = "unspecified.";

					var category;
					var categoryFormatted;
					var image;
					if(tasks[i].category_id === "1") {
						category = "food";
						categoryFormatted = "Food";
						image = "img/food.png";
					}
					else if(tasks[i].category_id === "2") {
						category = "rides";
						categoryFormatted = "Rides";
						image = "img/rides.png";
					}
					else if(tasks[i].category_id === "3") {
						category = "groceries";
						categoryFormatted = "Groceries";
						image = "img/groceries.png";
					}
					else if(tasks[i].category_id === "4") {
						category = "cleaning";
						categoryFormatted = "Cleaning";
						image = "img/cleaning.png";
					}
					else if(tasks[i].category_id === "5") {
						category = "laundry";
						categoryFormatted = "Laundry";
						image = "img/laundry2.png";
					}
					else if(tasks[i].category_id === "6") {
						category = "maintenance";
						categoryFormatted = "Maintenance";
						image = "img/maintenance.png";
					}
					else if(tasks[i].category_id === "7") {
						category = "techSupport";
						categoryFormatted = "techSupport";
						image = "img/techsupport.png";
					}
					else if(tasks[i].category_id === "8") {
						category = "other";
						categoryFormatted = "Other";
						image = "img/other.png";
					}

					if(tasks[i].is_offer_for_help === 0) {
						var html = 	'<h3>Help for: ' + tasks[i].short_description + '</h3><div><div class="row"><img class="jobPic three columns" src="' + image + '"><div class="jobContactInfo seven columns">' + 'Category: ' + categoryFormatted + '<br>Location: ' + tasks[i].location + '<br><br><span class="smallText">Posted:</span> ' + tasks[i].date_posted + '<br><span class="smallText">End Time:</span> ' + '*end_time*' + '</div><div class="seperator"></div><div class="three columns"><div class="smallText">You offered:</div><br><div class="jobDashPrice left">$' + tasks[i].price + '</div></div></div><div class = "row"><div class="jobNotes twelve columns"><p class="notesHeader">Notes:</p>' + tasks[i].notes + '</div></div><div class = "row center"><input type="button" class="cancelJob five columns" value="Cancel Job"><input type="button" class="jobCompleted five columns" value="Job Completed"></div></div>';
						accordionRight.append(html);
					}
					else {
						var html = 	'<h3>' + tasks[i].chooser_fName + ' has offered Help!</h3><div><div class = "row"><span class = "bidHeader twelve column center">' + tasks[i].chooser_fName + ' has requested to complete your job: ' + tasks[i].short_description + '</span></div><div class="row"><img class="jobPic three columns" src="' + image + '"><div class="jobContactInfo seven columns">Name: ' + tasks[i].chooser_fName + ' ' + tasks[i].chooser_lName + '<br><br><span class="smallText">Posted:</span> ' + tasks[i].date_posted + '</div><div class="seperator"></div><div class="three columns"><div class="smallText">You offered ' + tasks[i].ChooserFirst + ':</div><br><div class="jobDashPrice left">$' + tasks[i].price + '</div></div></div><div class = "row"><div class = "six column ratingDiv center">Overall Rating:<div class="row"><span id="overall' + tasks[i].task_id + '"class="ratingLabel two column"></span><div class="barArea"><div class="ratingBg"></div><div class="ratingFg" id="overallFg' + tasks[i].task_id + '"></div></div></div></div><div class = "six column ratingDiv center">Speed Rating:<div class="row"><span class="ratingLabel two column" id="speed' + tasks[i].task_id + '"></span><div class="barArea"><div class="ratingBg"></div><div class="ratingFg" id="speedFg' + tasks[i].task_id + '"></div></div></div></div></div><div class = "row center"><input type="button" class="decline five columns" value="Decline"><input type="button" class="accept five columns" value="Accept"></div></div>';
						accordionRight.append(html);
						var ratingLabel = document.getElementById("overall" + tasks[i].task_id);
						var ratingBar = document.getElementById("overallFg" + tasks[i].task_id);
						$(ratingLabel).append(tasks[i].chooser_reliability + "%");
						$(ratingBar).width(ratingLabel.innerHTML);
						var ratingLabel2 = document.getElementById("speed" + tasks[i].task_id);
						var ratingBar2 = document.getElementById("speedFg" + tasks[i].task_id);
						$(ratingLabel2).append(tasks[i].chooser_speed + "%");
						$(ratingBar2).width(ratingLabel.innerHTML);
					}
				}

						
				//empty message
				if(accordionRight.html() === '') {
					accordionRight.append('You have no help. Try harder!');
				}


				//Build Accordion:
				$( "#accordionRight" ).accordion({ heightStyle: "fill", collapsible: true/*, active: false*/});
				}
			
		});



	}

});