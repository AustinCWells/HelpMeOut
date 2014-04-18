var userInfo = {};

$(document).ready(function(){
	$(".modal").hide();
});

$(window).ready(function(event) {

	$.cookie.json = true;

	login();

	$("li").hover(

		function(){
			$(this).addClass("selected");
		},
		function(){
			$(this).removeClass("selected");
		}
	);

	$("#navLogOut a").click(function(event){

		event.preventDefault();
		logOut();
	});

	var width = $("li#navUser").width();
	console.log(width);
	$("#userNav li").width(width);


	var marginLeft = $("input").css("margin-left");

	$("label").css("margin-left", marginLeft);

	var navHeight = $("#navMenu").height() - 10;
	$("#tokenImg").height(navHeight);
	
});

var logOut = function(){

	$.removeCookie("userInfo");
	$("#navMenu li").toggleClass("navVisible");
	window.location = "index.php";

	
}
