window.addEventListener('load', function(event) {

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
			var badgeName = "FOOD DEMON";
			var badgeDesc = "You eat a lot of food. A LOT.";
		}
		else if (badges[i] === 2) {
			var badgeSrc = "img/nightowl.png";
			var badgeName = "Certified Car Owner";
			var badgeDesc = "You own a car. Don't you feel special?";
		}
		else if (badges[i] === 3) {
			var badgeSrc = "img/speeddemon.png";
			var badgeName = "Kroger Aficionado";
			var badgeDesc = "You know the aisles of the supermarket from Cereals to Deserts.";
		}

		var badgeHTML = '<div class="badge" id="badge' + badges[i] + '"><img class="badgeImg" src="' + badgeSrc + '"><br>' + badgeName + ':<br>' + badgeDesc + '</div>';
		badgeSpace.append(badgeHTML);

	}


}, false);
