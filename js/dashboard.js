

window.addEventListener('load', function(event) {
	var accordionLeft = $('#accordionLeft');
	var accordionRight = $('#accordionRight');

	var jobsList = [1,2,3];
	for(var i=0;i<jobsList.length;i++) {
		if(i===0) {
			accordionLeft.empty();
		}
		var html = '<h3>Job #' + jobsList[i] + '</h3><div><img class="jobPic" src="' + 'img/food.png' + '"><div class="jobContactInfo">' + 'Name: ' + 'Jordan Silver' + '<br>Phone: ' + 'phonenumbergoeshere' + '<br>Email: ' + 'jcsilver@smu.edu' + '<br>Location: ' + 'College Station AKA middle of nowhere podunk piece of shit town' + '</div><div class="jobDashPrice">' + '$' + '5' + '</div><br><br><br><br><br><div class="jobMap">' + '**Map not implemented**' + '</div><div class="jobNotes">' + 'Here is the description for Job #' + jobsList[i] + '!</div><input type="button" class="cancelJob leftButton" value="Cancel Job"><input type="button" class="jobCompleted rightButton" value="Job Completed"</div>';
		accordionLeft.append(html);

	}

	for(var i=0;i<jobsList.length;i++) {
		if(i===0) {
			accordionRight.empty();
		}
		var html = '<h3>Job #' + jobsList[i] + '</h3><div><p class="jobHeader">' + 'WILLSOOOOOOOON' + ' has requested to complete your task: "' + 'Clean my shoes, bitch' + '"<br><img class="jobPic" src="' + 'img/food.png' + '"><div class="jobContactInfo">' + 'Name: ' + 'Jordan Silver' + '<br>Jobs Completed: ' + 'OVER9000!' + '</div><div class="jobDashPrice">' + '$' + '5' + '</div><br><div class="jobProfile">Badges, rating, and all the other goodies!</div><input type="button" class="acceptButton leftButton" value="Accept"><input type="button" class="declineButon rightButton" value="Decline"</div>';
		accordionRight.append(html);

	}



	$(function() {
		$( "#accordionLeft" ).accordion({ heightStyle: "fill" , collapsible: true});
		$( "#accordionRight" ).accordion({ heightStyle: "fill", collapsible: true, active: false});
	});


}, false);