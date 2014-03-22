window.addEventListener('load', function(event) {

	var ratingBar = document.getElementById("ratingFg");
	var percent = document.getElementById("ratingLabel");
	$(ratingBar).width(percent.innerHTML);


	$("#profilePic").attr("src", "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/t1.0-1/p200x200/1606987_10152195066022415_1956973447_n.jpg");
	var contactInfoHTML =  "Name: " + "Jordan Silver" + "<br>Phone #: " + "you can't have it" + "<br>Email: " + "jcsilver@smu.edu" + "<br>Location: " + "Table24";
	$("#contactInfo").append(contactInfoHTML); 

}, false);
