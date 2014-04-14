$(window).ready(function(event) {

	$("#navAccount").addClass("currentPage").removeClass("hoverable");



	$("#profilePic").attr("src", "img/lab.png");
	var contactInfoHTML =  "Name: " + userInfo.firstName + ' ' + userInfo.lastName + "<br>Phone #: " + userInfo.phone + "<br>Email: " + userInfo.email;
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
			var badgeDesc = "You take on multiple requests at a time";
		}
		else if (badges[i] === 2) {
			var badgeSrc = "img/nightowl.png";
			var badgeName = "Night Owl";
			var badgeDesc = "You Work the Graveyard Shift";
		}
		else if (badges[i] === 3) {
			var badgeSrc = "img/speeddemon.png";
			var badgeName = "Speed Demon";
			var badgeDesc = "They call you... 'El Rapido'";
		}

		var badgeHTML = '<div class="badge" id="badge' + badges[i] + '"><img class="badgeImg" src="' + badgeSrc + '"><br><div class="badgeName">' + badgeName + ':</div><br><div class="badgeDesc">' + badgeDesc + '</div></div>';
		badgeSpace.append(badgeHTML);

	}


});
