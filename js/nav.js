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

	//set the width of the email to fit the users email length
	var width = $("li#navUser").width();
	$("#userNav li").width(width);

	//makes label line up with left side of sub input box
	var marginLeft = $("input").css("margin-left");
	$("label").css("margin-left", marginLeft);

	//Centers logo vertically in nav
	var navHeight = $(".navVisible").height();
	var logoHeight = $("#title").height();
	$("#title").css("margin-top", (navHeight - logoHeight)/2)

	//Centers login verticaly in nav
	var loginHeight = $("#navLogin").height();
	$("#navLogin").css("margin-top", (navHeight - loginHeight)/2);


	//Sizing token img on nav
	$("#tokenImg").height(navHeight - 6).css("margin-top", 3);

	
});

var login = function(){

	if(checkLogin()){

		userInfo = $.cookie("userInfo");

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
				'"THINGS DON\'T HAVE TO CHANGE THE WORLD TO BE IMPORTANT." - THE LATE, GREAT STEVE (YOBS) JOBS',
				'“No one has ever become poor by giving.” - Anne Frank, diary of Anne Frank',
				'"“No one is useless in this world who lightens the burdens of another.” - Charles Dickens',
				'“When we give cheerfully and accept gratefully, everyone is blessed.” - Maya Angelou',
				'“We only have what we give.” - Isabel Allende',
				'“Doing nothing for others is the undoing of ourselves.” - Horace Mann',
				'“Give, but give until it hurts.” - Mother Teresa',
				'“Those who are happiest are those who do the most for others.” - Booker T. Washington, Up from Slavery',
				'“Self-improvement comes mainly from trying to help others.” - Sir John Templeton',
				'“The only people who you should get even with are those who have helped you.” - John Southard',
				'“We can have anything we want on life, if we just help others to found what they need” - Ebelsain Villegas',
				'"We can not help everyone, but everyone can help someone." - Ronald Reagan',
				'"People never forget that helping hand especially when times are tough." - Catherine Pulsifer ',
				'"Only by giving are you able to receive more than you already have."- Jim Rohn ',
			];

var setQoute = function(){

	var numQoutes = 20;

 	var random = Math.floor(Math.random() * numQoutes);

	$('#randomText').text(qoutes[random]);
}
