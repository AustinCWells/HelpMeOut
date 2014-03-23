window.addEventListener('load', function(event) {

	$('#ratingLabel').append('23%'/*get the rating%*/);
	var ratingBar = document.getElementById("ratingFg");
	var percent = document.getElementById("ratingLabel");
	$(ratingBar).width(percent.innerHTML);


	$("#profilePic").attr("src", "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/t1.0-1/p200x200/1606987_10152195066022415_1956973447_n.jpg");
	var contactInfoHTML =  "Name: " + "Jordan Silver" + "<br>Phone #: " + "you can't have it" + "<br>Email: " + "jcsilver@smu.edu" + "<br>Location: " + "Table24";
	$("#contactInfo").append(contactInfoHTML); 

	var badges = [1,2,3];
	var badgeSpace = $('#badgeSpace');

	for(var i=0;i<badges.length;i++) {
		if(i===0) {
			badgeSpace.empty();
		}
		if (badges[i] === 1) {
			var badgeSrc = "img/multitasker.png";
			var badgeName = "Multitasker";
			var badgeDesc = "Multitasker description.";
		}
		else if (badges[i] === 2) {
			var badgeSrc = "img/nightowl.png";
			var badgeName = "Night Owl";
			var badgeDesc = "Night Owl description.";
		}
		else if (badges[i] === 3) {
			var badgeSrc = "img/speeddemon.png";
			var badgeName = "Speed Demon";
			var badgeDesc = "Speed Demon description.";
		}

		var badgeHTML = '<div class="badge" id="badge' + badges[i] + '"><img class="badgeImg" src="' + badgeSrc + '"><br><div class="badgeName">' + badgeName + ':</div><br><div class="badgeDesc">' + badgeDesc + '</div></div>';
		badgeSpace.append(badgeHTML);

	}


}, false);
