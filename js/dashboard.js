

window.addEventListener('load', function(event) {
	var accordionLeft = $('#accordionLeft');
	var accordionRight = $('#accordionRight');

	var jobsList = [1,2,3];
	for(var i=0;i<jobsList.length;i++) {
		if(i===0) {
			accordionLeft.empty();
		}
		var html = '<h3>Job #' + jobsList[i] + '</h3><div><p>Here is the description for Job #' + jobsList[i] + '!</p></div>';
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
		$( "#accordionLeft" ).accordion();
		$( "#accordionRight" ).accordion();
	});


}, false);