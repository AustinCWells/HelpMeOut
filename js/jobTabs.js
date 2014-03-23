jQuery(function() {
jQuery( "#tabs" ).tabs();
});

window.addEventListener('load', function(event) {

	for(var i=1;i<11;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="foodPosting' + i + '"><p class="jobDesc">' + "I AM HAUNGREH" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/food.png' + '"></div></a>';
		$('#food').append(html);
	}
	if($('#food').html() === '') {
		$('#food').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<11;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="laundryPosting' + i + '"><p class="jobDesc">' + "WASH MY SOCKS" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/cleaning.png' + '"></div></a>';
		$('#laundry').append(html);
	}
	if($('#laundry').html() === '') {
		$('#laundry').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<11;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="groceriesPosting' + i + '"><p class="jobDesc">' + "KROGER RUN 4 ME" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/groceries.png' + '"></div></a>';
		$('#groceries').append(html);
	}
	if($('#groceries').html() === '') {
		$('#groceries').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<1;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="tutoringPosting' + i + '"><p class="jobDesc">' + "ISNT THIS THE SAME AS RIDES" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/rides.png' + '"></div></a>';
		$('#tutoring').append(html);
	}
	if($('#tutoring').html() === '') {
		$('#tutoring').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<11;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="ridesPosting' + i + '"><p class="jobDesc">' + "ISNT THIS THE SAME AS TRANSP." + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/rides.png' + '"></div></a>';
		$('#rides').append(html);
	}
	if($('#rides').html() === '') {
		$('#rides').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<1;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="ridesPosting' + i + '"><p class="jobTitle">' + "ISNT THIS THE SAME AS TRANSP." + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/rides.png' + '"></div></a>';
		$('#recentJobs').append(html);
	}
	if($('#recentJobs').html() === '') {
		$('#recentJobs').append('Sorry, there are no recent jobs.<br><img src="http://s3.amazonaws.com/crunchbase_prod_assets/assets/images/resized/0001/0974/10974v7-max-250x250.jpg">');
	}


}, false);