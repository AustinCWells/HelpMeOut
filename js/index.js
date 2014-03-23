jQuery(function() {
jQuery( "#tabs" ).tabs();
});

window.addEventListener('load', function(event) {

	for(var i=1;i<11;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="foodPosting' + i + '"><p class="jobTitle">' + "I AM HAUNGREH" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/food.png' + '"></div></a>';
		$('#food').append(html);
	}

	for(var i=1;i<11;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="laundryPosting' + i + '"><p class="jobTitle">' + "WASH MY SOCKS" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/cleaning.png' + '"></div></a>';
		$('#laundry').append(html);
	}

	for(var i=1;i<11;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="groceriesPosting' + i + '"><p class="jobTitle">' + "KROGER RUN 4 ME" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/groceries.png' + '"></div></a>';
		$('#groceries').append(html);
	}

	for(var i=1;i<11;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="transportationPosting' + i + '"><p class="jobTitle">' + "ISNT THIS THE SAME AS RIDES" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/rides.png' + '"></div></a>';
		$('#transportation').append(html);
	}

	for(var i=1;i<11;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="ridesPosting' + i + '"><p class="jobTitle">' + "ISNT THIS THE SAME AS TRANSP." + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/rides.png' + '"></div></a>';
		$('#rides').append(html);
	}

	for(var i=1;i<4;i++) {
		if(i===1) {
			$('#recentJobs').empty();
		}
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="groceriesPosting' + i + '"><p class="jobTitle">' + "KROGER RUN 4 ME" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/groceries.png' + '"></div></a>';
		$('#recentJobs').append(html);
	}


}, false);