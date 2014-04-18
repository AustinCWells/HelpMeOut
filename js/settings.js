$(window).ready(function(event) {

	$("#navSettings").addClass("currentPage").removeClass("hoverable");

	$("#firstName").attr("placeholder", userInfo.firstName);
	$("#lastName").attr("placeholder", userInfo.lastName);
	$("#phoneNum").attr("placeholder", userInfo.phoneNum);


});