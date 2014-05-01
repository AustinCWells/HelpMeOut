$(document).ready(function(){
	if(!checkLogin())
		window.location = "index.php";
});

$(window).ready(function(event) {

	$("#navAccount").addClass("currentPage")
	$("#navAccount").removeClass("hoverable");

	var userJSON = {};
	userJSON.user_id = userInfo.userID;
	console.log(JSON.stringify(userJSON));

	$.ajax({
		type: 'POST',
		url: "api/useraccount",
		content: 'application/json',
		data: JSON.stringify(userJSON),
		success: function(data){
			var user_info = {};
			user_info = JSON.parse(data);
			console.log(user_info);

			console.log("is_custom = " + user_info.is_custom);
			if(user_info.is_custom === 0) {
				$("#profilePic").attr("src", "img/fontenot.jpeg");
			}
			else {
				$("#profilePic").attr("src", user_info.custom_image_path);//TODO: load custom profile image
			}
			var contactInfoHTML =  "Name: " + user_info.first_name + ' ' + user_info.last_name + "<br>Phone #: <span id='phone'>" + user_info.phone + "</span><br>Email: " + user_info.email + "<br><br>Jobs Completed: " + user_info.jobs_completed + "<br>Jobs Requested: " + user_info.jobs_requested;
			$("#contactInfo").append(contactInfoHTML); 

			$('#phone').text(function(i, text) {
			    return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
			});

			var badges = [user_info.completions_tier, user_info.night_owl_tier, user_info.requests_tier];
			var badgeSpace = $('#badgeSpace');
			console.log(badges);

			for(var i=0;i<badges.length;i++) {
				badgeSpace.css("margin-left",(parseFloat(badgeSpace.css("margin-left")) - 100) + 'px');

				if(i === 0) {
					badgeSpace.empty();

					if (badges[i] === 1) {
						var badgeName = "Money Maker Basic";
						var badgeSrc =  "img/badges/completions_basic.png";
						var badgeDesc = "Completed [SPENCER HOW MANY JOBS IS THIS] Jobs";
					}
					if (badges[i] === 2) {
						var badgeName = "Money Maker Bronze";
						var badgeSrc =  "img/badges/completions_bronze.png";
						var badgeDesc = "Completed [SPENCER HOW MANY JOBS IS THIS] Jobs";
					}
					else if (badges[i] === 3) {
						var badgeName = "Money Maker Silver";
						var badgeSrc =  "img/badges/completions_silver.png";
						var badgeDesc = "Completed 50 Jobs";
					}
					else if (badges[i] === 4) {
						var badgeName = "Money Maker Gold";
						var badgeSrc =  "img/badges/completions_gold.png";
						var badgeDesc = "Completed [SPENCER HOW MANY JOBS IS THIS] Jobs";
					}

					var badgeHTML = '<div class="badge" id="badge' + badges[i] + '"><img class="badgeImg" src="' + badgeSrc + '"><br><div class="badgeName">' + badgeName + ':</div><br><div class="badgeDesc">' + badgeDesc + '</div></div>';
					badgeSpace.append(badgeHTML);
				}

				if(i === 1) {
					var badgeDesc = "You Work the Graveyard Shift";
					if (badges[i] === 1) {
						var badgeName = "Night Owl Basic";
						var badgeSrc =  "img/badges/night_owl_basic.png";
					}
					if (badges[i] === 2) {
						var badgeName = "Night Owl Bronze";
						var badgeSrc =  "img/badges/night_owl_bronze.png";
					}
					else if (badges[i] === 3) {
						var badgeName = "Night Owl Silver";
						var badgeSrc =  "img/badges/night_owl_silver.png";
					}
					else if (badges[i] === 4) {
						var badgeName = "Night Owl Gold";
						var badgeSrc =  "img/badges/night_owl_gold.png";
					}

					var badgeHTML = '<div class="badge" id="badge' + badges[i] + '"><img class="badgeImg" src="' + badgeSrc + '"><br><div class="badgeName">' + badgeName + ':</div><br><div class="badgeDesc">' + badgeDesc + '</div></div>';
					badgeSpace.append(badgeHTML);
				}

				if(i === 2) {
					var badgeDesc = "You Work the Graveyard Shift";
					if (badges[i] === 1) {
						var badgeName = "[SPENCER I NEED NAMES] Basic";
						var badgeSrc =  "img/badges/completions_basic.png";
						var badgeDesc = "Asked for help 10 times";
					}
					if (badges[i] === 2) {
						var badgeName = "[SPENCER I NEED NAMES] Bronze";
						var badgeSrc =  "img/badges/completions_bronze.png";
						var badgeDesc = "Asked for help [SPENCER HALP] times";
					}
					else if (badges[i] === 3) {
						var badgeName = "[SPENCER I NEED NAMES] Silver";
						var badgeSrc =  "img/badges/completions_silver.png";
						var badgeDesc = "Asked for help [SPENCER HALP] times";
					}
					else if (badges[i] === 4) {
						var badgeName = "[SPENCER I NEED NAMES] Gold";
						var badgeSrc =  "img/badges/completions_gold.png";
						var badgeDesc = "Asked for help [SPENCER HALP] times";
					}

					var badgeHTML = '<div class="badge" id="badge' + badges[i] + '"><img class="badgeImg" src="' + badgeSrc + '"><br><div class="badgeName">' + badgeName + ':</div><br><div class="badgeDesc">' + badgeDesc + '</div></div>';
					badgeSpace.append(badgeHTML);
				}


				// var badgeName = "Multitasker";
				// var badgeDesc = "You take on multiple requests at a time";

				// var badgeName = "Night Owl";
				// var badgeDesc = "You Work the Graveyard Shift";

				// var badgeName = "Speed Demon";
				// var badgeDesc = "They call you... 'El Rapido'";

			}
		}
	});

});
