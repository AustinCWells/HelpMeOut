

window.addEventListener('load', function(event) {
	var accordionLeft = $('#accordionLeft');
	var accordionRight = $('#accordionRight');

	var jobsList = [1,2,3];
	for(var i=0;i<jobsList.length;i++) {
		if(i===0) {
			accordionLeft.empty();
		}
		var html = '<h3>Job #' + jobsList[i] + '</h3><div><img class="jobPic" src="' + 'img/food.png' + '"><div class="jobContactInfo">' + 'Name: ' + 'Jordan Silver' + '<br>Phone: ' + 'phonenumbergoeshere' + '<br>Email: ' + 'jcsilver@smu.edu' + '<br>Location: ' + 'College Station AKA middle of nowhere podunk piece of shit town' + '</div><div class="jobDashPrice">' + '$' + '5' + '</div><br><div class="jobMap">' + '**Map not implemented**' + '</div><div class="jobNotes">' + 'Here is the description for Job #' + jobsList[i] + '!</div><input type="button" class="cancelJob" value="Cancel Job"><input type="button" class="jobCompleted" value="Job Completed"</div>';
		accordionLeft.append(html);

	}

	for(var i=0;i<jobsList.length;i++) {
		if(i===0) {
			accordionRight.empty();
		}
		var html = '<h3>Job #' + jobsList[i] + '</h3><div><p>Here is the description for Job #' + jobsList[i] + '!</p></div>';
		accordionRight.append(html);

	}



	$(function() {
		$( "#accordionLeft" ).accordion({ heightStyle: "fill" });
		$( "#accordionRight" ).accordion({ heightStyle: "fill" });
	});


}, false);