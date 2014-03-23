jQuery(function() {
jQuery( "#tabs" ).tabs();
});

window.addEventListener('load', function(event) {

	function getRandomInt(min, max) {
 		 return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var random = getRandomInt(0,5);
	$('#randomText').empty();
	if (random === 0)
		$('#randomText').append('"HELP WILL ALWAYS BE GIVEN AT HOGWARTS, HARRY, TO THOSE WHO ASK FOR IT." - ALBUS DUMBLEDORE');
	else if (random === 1)
		$('#randomText').append('"WON\'T YOU PLEASE, PLEASE HELP ME, HELP ME, HELP ME, OOH" - THE BEATLES. "HELP!"');
	else if (random === 2)
		$('#randomText').append('"IF YOU CAN, HELP OTHERS; IF YOU CANNOT DO THAT, AT LEAST DO NOT HARM THEM." - DALAI LAMA XIV');
	else if (random === 3)
		$('#randomText').append('"LIFE\'S MOST PERSISTENT AND URGENT QUESTION IS, \'WHAT ARE YOU DOING FOR OTHERS?\'" - MARTIN LUTHER KING JR.');
	else if (random === 4)
		$('#randomText').append('"LET EACH OF YOU LOOK NOT ONLY TO HIS OWN INTERESTS, BUT ALSO TO THE INTERESTS OF OTHERS." - PHILIPPIANS 2:4');
	else if (random === 5)
		$('#randomText').append('"HELP ME... HELP YOU. HELP ME, HELP YOU." - JERRY MAGUIRE (1996)');

	for(var i=1;i<11;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="foodPosting' + i + '"><p class="jobDesc">' + "I AM HAUNGREH" + '</p><p class="jobPrice">' + "$" + "5" + '</p><div class = "shadow" ><img class="jobImage" src="' + 'img/food.png' + '"></div></div></a>';
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
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="cleaningPosting' + i + '"><p class="jobDesc">' + "ISNT THIS THE SAME AS RIDES" + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/rides.png' + '"></div></a>';
		$('#cleaning').append(html);
	}
	if($('#cleaning').html() === '') {
		$('#cleaning').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<11;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="ridesPosting' + i + '"><p class="jobDesc">' + "ISNT THIS THE SAME AS TRANSP." + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/rides.png' + '"></div></a>';
		$('#rides').append(html);
	}
	if($('#rides').html() === '') {
		$('#rides').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<11;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="techSupportPosting' + i + '"><p class="jobDesc">' + "ISNT THIS THE SAME AS TRANSP." + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/techSupport.png' + '"></div></a>';
		$('#techSupport').append(html);
	}
	if($('#rides').html() === '') {
		$('#techSupport').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<11;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="otherPosting' + i + '"><p class="jobDesc">' + "ISNT THIS THE SAME AS TRANSP." + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/other.png' + '"></div></a>';
		$('#other').append(html);
	}
	if($('#rides').html() === '') {
		$('#other').append('Sorry, there are currently no jobs available in this category.');
	}

	for(var i=1;i<1;i++) {
		var html = '<a href="' + "index.php" + '"><div class="jobPost" id="recemtPosting' + i + '"><p class="jobTitle">' + "ISNT THIS THE SAME AS TRANSP." + '</p><p class="jobPrice">' + "$" + "5" + '</p><img class="jobImage" src="' + 'img/rides.png' + '"></div></a>';
		$('#recentJobs').append(html);
	}
	if($('#recentJobs').html() === '') {
		$('#recentJobs').append('Sorry, there are no recent jobs.<br><img src="http://s3.amazonaws.com/crunchbase_prod_assets/assets/images/resized/0001/0974/10974v7-max-250x250.jpg">');
	}

	/*$(".jobImage").hover(function(){

		$(this).css("width", "120%");

	},function(){
		$(this).css("box-shadow", "0px 0px 0px 0px");
	});
*/



	/*$(".jobImage").hover(function(){

		$(this).css("width", "120%");

	},function(){
		$(this).css("box-shadow", "0px 0px 0px 0px");
	});
*/




}, false);