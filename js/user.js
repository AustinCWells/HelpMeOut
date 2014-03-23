$(window).ready(function(){

	$.cookie.json = true;

	var user = {};
	user.userID = false;

	$.cookie("userInfo", user);

	var userInfo = $.cookie("userInfo");

	/*{
		userID: 
		if user is logged in set to userID
		else set to false
	}
	*/

	if(userInfo !== undefined)
		getJobInfo(userInfo.userID);

});

var getJobInfo = function(userID){

	if(userID === undefined || userID === false)
		console.log("Not logged in");
	else
		console.log("User ID: " + userID);

}