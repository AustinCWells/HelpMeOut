jQuery(function() {
jQuery( "#tabs" ).tabs();
});

window.addEventListener('load', function(event) {

	for(var i=1;i<11;i++) {
		var html = '<div class="jobPost" id="foodPosting' + i + '"><p class="jobTitle">' + "I AM HAUNGREH" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'http://www.vectors4all.net/preview/closed-mailing-envelope-clip-art.jpg' + '"></div>';
		$('#food').append(html);
		console.log(i);
	}

	for(var i=1;i<11;i++) {
		var html = '<div class="jobPost" id="laundryPosting' + i + '"><p class="jobTitle">' + "WASH MY SOCKS" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'http://www.vectors4all.net/preview/closed-mailing-envelope-clip-art.jpg' + '"></div>';
		$('#laundry').append(html);
		console.log(i);
	}

	for(var i=1;i<11;i++) {
		var html = '<div class="jobPost" id="groceriesPosting' + i + '"><p class="jobTitle">' + "KROGER RUN 4 ME" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'http://www.vectors4all.net/preview/closed-mailing-envelope-clip-art.jpg' + '"></div>';
		$('#groceries').append(html);
		console.log(i);
	}

	for(var i=1;i<11;i++) {
		var html = '<div class="jobPost" id="transportationPosting' + i + '"><p class="jobTitle">' + "ISNT THIS THE SAME AS RIDES" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'http://www.vectors4all.net/preview/closed-mailing-envelope-clip-art.jpg' + '"></div>';
		$('#transportation').append(html);
		console.log(i);
	}

	for(var i=1;i<11;i++) {
		var html = '<div class="jobPost" id="ridesPosting' + i + '"><p class="jobTitle">' + "ISNT THIS THE SAME AS TRANSP." + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'http://www.vectors4all.net/preview/closed-mailing-envelope-clip-art.jpg' + '"></div>';
		$('#rides').append(html);
		console.log(i);
	}


}, false);