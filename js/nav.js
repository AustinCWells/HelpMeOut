$(window).ready(function(event) {

	$.cookie.json = true;

	var userInfo = $.cookie("userInfo");

	userInfo = {};

	//console.log(window.location);

	if(userInfo !== undefined){
		$("#navMenu li").toggleClass("navVisible");
		console.log("here");
	}
	
});