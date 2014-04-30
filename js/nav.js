var userInfo = {};

$(document).ready(function(){
	$(".modal").hide();
	setQoute();
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
	//console.log(width);
	$("#userNav li").width(width);


	var marginLeft = $("input").css("margin-left");

	$("label").css("margin-left", marginLeft);

	var navHeight = $("#navMenu").height() - 10;
	$("#tokenImg").height(navHeight);
	
});

var login = function(){

	if(checkLogin()){

		userInfo = $.cookie("userInfo");
		refreshAllJobs();

		$("#navMenu li").toggleClass("navVisible");
		$("#navUserEmail").text(userInfo.email);
		$(".tokenCount").text(userInfo.tokens);

	}

	else {

	}
}

var logOut = function(){

	$.removeCookie("userInfo");
	$("#navMenu li").toggleClass("navVisible");
	window.location = "index.php";

}

var checkLogin = function(){
	
	if($.cookie("userInfo") === undefined)
		return false;
	else
		return true;
}

var checkTokens = function(){

	if(userInfo.tokens > 0)
		return true;
	else
		return false;

}

var qoutes = [
				'"HELP WILL ALWAYS BE GIVEN AT HOGWARTS, HARRY, TO THOSE WHO ASK FOR IT." - ALBUS DUMBLEDORE',
				'"WON\'T YOU PLEASE, PLEASE HELP ME, HELP ME, HELP ME, OOH" - THE BEATLES. "HELP!"',
				'"IF YOU CAN, HELP OTHERS; IF YOU CANNOT DO THAT, AT LEAST DO NOT HARM THEM." - DALAI LAMA XIV',
				'"LIFE\'S MOST PERSISTENT AND URGENT QUESTION IS, \'WHAT ARE YOU DOING FOR OTHERS?\'" - MARTIN LUTHER KING JR.',
				'"LET EACH OF YOU LOOK NOT ONLY TO HIS OWN INTERESTS, BUT ALSO TO THE INTERESTS OF OTHERS." - PHILIPPIANS 2:4',
				'"HELP ME... HELP YOU. HELP ME, HELP YOU." - JERRY MAGUIRE (1996)',
				'"THINGS DON\'T HAVE TO CHANGE THE WORLD TO BE IMPORTANT." - THE LATE, GREAT STEVE (YOBS) JOBS'
			];

var setQoute = function(){

	var numQoutes = 7;

 	var random = Math.floor(Math.random() * numQoutes);

	$('#randomText').text(qoutes[random]);
}
