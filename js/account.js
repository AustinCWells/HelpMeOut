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
				var imagePath = "img/user/" + user_info.custom_image_path;
				$("#profilePic").attr("src", imagePath);
			}
			var contactInfoHTML =  "Name: " + user_info.first_name + ' ' + user_info.last_name + "<br>Phone #: <span id='phone'>" + user_info.phone + "</span><br>Email: " + user_info.email + "<br><br>Jobs Completed: " + user_info.jobs_completed + "<br>Jobs Requested: " + user_info.jobs_requested;
			$("#contactInfo").append(contactInfoHTML); 

			$('#phone').text(function(i, text) {
			    return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
			});

			var radiobtn;
			if(user_info.reliability >= 80) {
				radiobtn = document.getElementById("reliabilityRatingProfile5");
			}
			if(user_info.reliability >= 60 && user_info.reliability < 80) {
				radiobtn = document.getElementById("reliabilityRatingProfile4");
			}
			if(user_info.reliability >= 40 && user_info.reliability < 60) {
				radiobtn = document.getElementById("reliabilityRatingProfile3");
			}
			if(user_info.reliability >= 20 && user_info.reliability < 40) {
				radiobtn = document.getElementById("reliabilityRatingProfile2");
			}
			if(user_info.reliability < 20) {
				radiobtn = document.getElementById("reliabilityRatingProfile1");
			}
			radiobtn.checked = true;

			if(user_info.speed > 80) {
				radiobtn = document.getElementById("speedRatingProfile5");
			}
			if(user_info.speed > 60 && user_info.speed < 80) {
				radiobtn = document.getElementById("speedRatingProfile4");
			}
			if(user_info.speed > 40 && user_info.speed < 60) {
				radiobtn = document.getElementById("speedRatingProfile3");
			}
			if(user_info.speed > 20 && user_info.speed < 40) {
				radiobtn = document.getElementById("speedRatingProfile2");
			}
			if(user_info.speed < 20) {
				radiobtn = document.getElementById("speedRatingProfile1");
			}
			radiobtn.checked = true;

			var badges = [user_info.completions_tier, user_info.night_owl_tier, user_info.requests_tier];
			var badgeSpace = $('#badgeSpace');
			console.log(badges);

			for(var i=0;i<badges.length;i++) {
				if(i === 0) {
					badgeSpace.empty();
					if(badges[i] != 0) {
						badgeSpace.css("margin-left",(parseFloat(badgeSpace.css("margin-left")) - 100) + 'px');
						if (badges[i] === 1) {
							var badgeName = "Money Maker Basic";
							var badgeSrc =  "img/Badges/completions_basic.png";
							var badgeDesc = "Completed 1 Job";
						}
						if (badges[i] === 2) {
							var badgeName = "Money Maker Bronze";
							var badgeSrc =  "img/Badges/completions_bronze.png";
							var badgeDesc = "Completed 25 Jobs";
						}
						else if (badges[i] === 3) {
							var badgeName = "Money Maker Silver";
							var badgeSrc =  "img/Badges/completions_silver.png";
							var badgeDesc = "Completed 50 Jobs";
						}
						else if (badges[i] === 4) {
							var badgeName = "Money Maker Gold";
							var badgeSrc =  "img/Badges/completions_gold.png";
							var badgeDesc = "Completed 100 Jobs";
						}

						var badgeHTML = '<div class="badge" id="badge' + badges[i] + '"><img class="badgeImg" src="' + badgeSrc + '"><br><div class="badgeName">' + badgeName + ':</div><br><div class="badgeDesc">' + badgeDesc + '</div></div>';
						badgeSpace.append(badgeHTML);
					}
				}

				if(i === 1 && badges[i] !=0) {
					badgeSpace.css("margin-left",(parseFloat(badgeSpace.css("margin-left")) - 100) + 'px');
					var badgeDesc = "You Work the Graveyard Shift";
					if (badges[i] === 1) {
						var badgeName = "Night Owl Basic";
						var badgeSrc =  "img/Badges/night_owl_basic.png";
						var badgeDesc = "[nightowl description]";
					}
					if (badges[i] === 2) {
						var badgeName = "Night Owl Bronze";
						var badgeSrc =  "img/Badges/night_owl_bronze.png";
						var badgeDesc = "[nightowl description]";
					}
					else if (badges[i] === 3) {
						var badgeName = "Night Owl Silver";
						var badgeSrc =  "img/Badges/night_owl_silver.png";
						var badgeDesc = "[nightowl description]";
					}
					else if (badges[i] === 4) {
						var badgeName = "Night Owl Gold";
						var badgeSrc =  "img/Badges/night_owl_gold.png";
						var badgeDesc = "[nightowl description]";
					}

					var badgeHTML = '<div class="badge" id="badge' + badges[i] + '"><img class="badgeImg" src="' + badgeSrc + '"><br><div class="badgeName">' + badgeName + ':</div><br><div class="badgeDesc">' + badgeDesc + '</div></div>';
					badgeSpace.append(badgeHTML);
				}

				if(i === 2 && badges[i] !=0) {
					badgeSpace.css("margin-left",(parseFloat(badgeSpace.css("margin-left")) - 100) + 'px');
					if (badges[i] === 1) {
						var badgeName = "The Helpless Basic";
						var badgeSrc =  "img/Badges/requests_basic.png";
						var badgeDesc = "Asked for help 1 time";
					}
					if (badges[i] === 2) {
						var badgeName = "The Helpless Bronze";
						var badgeSrc =  "img/Badges/requests_bronze.png";
						var badgeDesc = "Asked for help 25 times";
					}
					else if (badges[i] === 3) {
						var badgeName = "The Helpless Silver";
						var badgeSrc =  "img/Badges/requests_silver.png";
						var badgeDesc = "Asked for help 50 times";
					}
					else if (badges[i] === 4) {
						var badgeName = "The Helpless Gold";
						var badgeSrc =  "img/Badges/requests_gold.png";
						var badgeDesc = "Asked for help 100 times";
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
