$(window).ready(function(event) {

	$.cookie.json = true;

	var userInfo = $.cookie("userInfo");

	userInfo = {};

	console.log(window.location);

	if(userInfo === undefined){
		alert("Your are not loged in.");
		//window.location = "index.php";
	}


	else{

		console.log("here");

	}
	
});