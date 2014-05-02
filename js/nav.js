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
				'"NO ONE HAS EVER BECOME POOR BY GIVING." - ANNE FRANK, DIARY OF ANNE FRANK',
				'"NO ONE IS USELESS IN THIS WORLD WHO LIGHTENS THE BURDENS OF ANOTHER." - CHARLES DICKENS',
				'"WHEN WE GIVE CHEERFULLY AND ACCEPT GRATEFULLY, EVERYONE IS BLESSED." - MAYA ANGELOU',
				'"WE ONLY HAVE WHAT WE GIVE." - ISABEL ALLENDE',
				'"DOING NOTHING FOR OTHERS IS THE UNDOING OF OURSELVES." - HORACE MANN',
				'"GIVE, BUT GIVE UNTIL IT HURTS." - MOTHER TERESA',
				'"THOSE WHO ARE HAPPIEST ARE THOSE WHO DO THE MOST FOR OTHERS." - BOOKER T. WASHINGTON, UP FROM SLAVERY',
				'"SELF-IMPROVEMENT COMES MAINLY FROM TRYING TO HELP OTHERS." - SIR JOHN TEMPLETON',
				'"THE ONLY PEOPLE WHO YOU SHOULD GET EVEN WITH ARE THOSE WHO HAVE HELPED YOU." - JOHN SOUTHARD',
				'"WE CAN NOT HELP EVERYONE, BUT EVERYONE CAN HELP SOMEONE." - RONALD REAGAN',
				'"PEOPLE NEVER FORGET THAT HELPING HAND ESPECIALLY WHEN TIMES ARE TOUGH." - CATHERINE PULSIFER',
				'"ONLY BY GIVING ARE YOU ABLE TO RECEIVE MORE THAN YOU ALREADY HAVE."- JIM ROHN',
				'"IF YOU LIGHT A LAMP FOR SOMEBODY, IT WILL ALSO BRIGHTEN YOUR PATH."- BUDDHIST SAYING',
				'"THE MORE I HELP OTHERS TO SUCCEED, THE MORE I SUCCEED." - RAY KROC',
				'"NEVER LOOK DOWN ON ANYBODY UNLESS YOU HELPING HIM UP." -JESSE JACKSON',
				'"AFTER THE VERB \'TO LOVE,\' \'TO HELP\' IS THE MOST BEAUTIFUL VERB IN THE WORLD." -BERTHA VON SUTTNER',
				'"HELP ME, HELP ME, HELP ME; I WANT YOU TO HELP ME HELP ME HELP ME" - CHRIS BROWN. "HELP ME"',
				'"YOU WILL DISCOVER THAT YOU HAVE TWO HANDS. ONE IS FOR HELPING YOURSELF AND THE OTHER IS FOR HELPING OTHERS." - AUDREY HEPBURN',
				'"SEEK SOMETHING OUTSIDE YOUR NINE-TO-FIVE JOB AS AN ADDITIONAL SOURCE OF FULFILLMENT AND AS A WAY OF HELPING OTHERS."- HAROLD KUSHNER', 
				'"THE SERVICE WE RENDER OTHERS IS THE RENT WE PAY FOR OUR ROOM ON EARTH." - WILFRED GRENFEL',
				'"GIVING TO OTHERS WILL COMEBACK TO YOU." - CATHERINE PULSIFER ',
				'"MANY SMALL PEOPLE, IN MANY SMALL PLACES, DO MANY SMALL THINGS, THAT CAN ALTER THE FACE OF THE WORLD."- ANONYMOUS',
				'"YOU WILL RISE BY LIFTING OTHERS."- ROBERT G. INGERSOLL ORATOR, ATTORNEY, POLITICIAN'
			];

var setQoute = function(){

	var numQoutes = 30;

 	var random = Math.floor(Math.random() * numQoutes);

	$('#randomText').text(qoutes[random]);
}
