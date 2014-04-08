$(window).ready(function(event) {

	$("#navMyJobs").addClass("currentPage").removeClass("hoverable");
	
	var accordionLeft = $('#accordionLeft');
	var accordionRight = $('#accordionRight');

	
	var jobsList = [1,2,3];
	
	for(var i=0;i<jobsList.length;i++) {
		if(i===0) {
			accordionLeft.empty();
		}
		var html = 	'<h3>' + '*beggar_id*' + ': ' + '*short_description*' + '</h3><div><div class = "row"><img class="jobPic three columns" src="' + 'img/food.png' + '"><div class="jobContactInfo seven columns">Name: ' + '*first_name*' + ' ' + '*last_name*' + '<br>Phone: ' + '*phone_number*' + '<br>Email: ' + '*email_address*' + '<br>Location: ' + '*location*' + '<br><br><span class="smallText">Start Time:</span> ' + '*start_time*' + ' <span class="smallText">End Time:</span> ' + '*end_time*' + '</div><div class = "seperator"></div><div class="three columns"><div class="smallText">' + '*beggar_name*' + ' has offered you:</div><br><div class="jobDashPrice left">$' + '5' + '</div></div></div><div class = "row"><div class="jobNotes twelve columns"><p class="notesHeader">Notes:</p>' + '*notes* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae quam in ligula iaculis tristique vel vitae tellus. Nullam semper condimentum mauris. Donec in mi nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum gravida odio a bibendum semper. Etiam cursus velit sit amet nisi adipiscing commodo. Quisque nec tortor ac nunc aliquet dictum eu vitae metus.In quis tincidunt ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae quam in ligula iaculis tristique vel vitae tellus. Nullam semper condimentum mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae quam in ligula iaculis tristique vel vitae tellus. Nullam semper condimentum mauris. *notes*' + '</div></div><div class = "row center"><input type="button" class="cancelJob five columns" value="Cancel Job"><input type="button" class="jobCompleted five columns" value="Job Completed"></div></div>';
		accordionLeft.append(html);

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


	$(function() {
		$( "#accordionLeft" ).accordion({ heightStyle: "fill" , collapsible: true});
		$( "#accordionRight" ).accordion({ heightStyle: "fill", collapsible: true/*, active: false*/});
	});


});