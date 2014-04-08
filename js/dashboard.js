$(window).ready(function(event) {

	$("#navMyJobs").addClass("currentPage").removeClass("hoverable");
	
	var accordionLeft = $('#accordionLeft');
	var accordionRight = $('#accordionRight');

	$.getJSON("js/test.json",function(data){
		var tasks = data.tasks;


		
		for(var i=0;i<tasks;i++) {
			var html = 	'<h3>' + tasks[i].beggar_id + ': ' + tasks[i].short_description + '</h3><div><div class="row"><img class="jobPic three columns" src="' + 'img/food.png' + '"><div class="jobContactInfo seven columns">Name: ' + '*first_name*' + ' ' + '*last_name*' + '<br>Phone: ' + '*phone_number*' + '<br>Email: ' + '*email_address*' + '<br>Location: ' + '*location*' + '<br><br><span class="smallText">Start Time:</span> ' + '*start_time*' + ' <span class="smallText">End Time:</span> ' + '*end_time*' + '</div><div class="seperator"></div><div class="three columns"><div class="smallText">' + tasks[i].beggar_id + ' has offered you:</div><br><div class="jobDashPrice left">$' + tasks[i].price + '</div></div></div><div class = "row"><div class="jobNotes twelve columns"><p class="notesHeader">Notes:</p>' + tasks[i].notes + '</div></div><div class = "row center"><input type="button" class="cancelJob five columns" value="Cancel Job"><input type="button" class="jobCompleted five columns" value="Job Completed"></div></div></div>';
			accordionLeft.append(html);
		}
		if(accordionLeft.html() === '') {
			accordionLeft.append('You have no jobs. Get started slacker!');
		}
		
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
	});


	$(function() {
		$( "#accordionLeft" ).accordion({ heightStyle: "fill" , collapsible: true});
		$( "#accordionRight" ).accordion({ heightStyle: "fill", collapsible: true/*, active: false*/});
	});


});