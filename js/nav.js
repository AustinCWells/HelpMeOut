$(window).ready(function(event) {

	$.cookie.json = true;

	var userInfo = $.cookie("userInfo");

	userInfo = {};

	if(userInfo === undefined){
		alert("Your are not loged in.");
	}


	else{

		console.log("here");

	}
	
});