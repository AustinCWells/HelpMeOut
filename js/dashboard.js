

window.addEventListener('load', function(event) {
	var accordionLeft = $('#accordionLeft');
	var accordionRight = $('#accordionRight');

	var jobsList = [1,2,3];
	for(var i=0;i<jobsList.length;i++) {
		if(i===0) {
			accordionLeft.empty();
		}
		var html = '<h3>Job #' + jobsList[i] + '</h3><div><img class="jobPic" src="' + 'img/food.png' + '"><div class="jobContactInfo">' + 'Name: ' + 'Jordan Silver' + '<br>Phone: ' + 'phonenumbergoeshere' + '<br>Email: ' + 'jcsilver@smu.edu' + '<br>Location: ' + 'College Station ...its okay, i guess...' + '</div><div class="jobDashPrice left">' + '$' + '5' + '</div><br><br><br><br><br><div class="jobMap">' + '**Map not implemented**' + '</div><div class="jobNotes"><p class="notesHeader">Notes:</p>' + 'Here is the description for Job #' + jobsList[i] + '!</div><input type="button" class="cancelJob leftButton" value="Cancel Job"><input type="button" class="jobCompleted rightButton" value="Job Completed"</div>';
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

	for(var i=0;i<jobsList.length;i++) {
		if(i===0) {
			accordionRight.empty();
		}
		var profileHTML = '<div class="ratingDiv">Overall Rating:<br><br><span class="ratingLabel"></span><div class="barArea"><div class="ratingBg" ></div><div class="ratingFg"></div></div></div>';
		var html = '<h3>Job #' + jobsList[i] + '</h3><div><p class="jobHeader">' + 'Wilson Wilson' + ' has requested to complete your task: "' + 'Clean my shoes, please' + '"<br><img class="jobPic" src="' + 'img/food.png' + '"><div class="jobContactInfo">' + 'Name: ' + 'Wilson Wilson' + '<br>Jobs Completed: ' + 'OVER9000!' + '</div><div class="jobDashPrice right">' + 'Offered Price:<br>$' + '5' + '</div><br><div class="jobProfile">' + profileHTML + '</div><input type="button" class="acceptButton leftButton" value="Accept"><input type="button" class="declineButton rightButton" value="Decline"</div>';
		accordionRight.append(html);

	}

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
		$( "#accordionRight" ).accordion({ heightStyle: "fill", collapsible: true, active: false});
	});


}, false);