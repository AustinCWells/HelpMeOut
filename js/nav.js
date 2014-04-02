var userInfo = {};

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


	});

	$("#navLogOut a").click(function(event){

		event.preventDefault();
		logOut();
	});

	var width = $("li#navUser").width();
	console.log(width);
	$("#userNav li").width(width);


	var marginLeft = $("input").css("margin-left");

	$("label").css("margin-left", marginLeft);
	
});

var closeModal = function(){
	
	$(this).parent().parent().addClass("modal").removeClass("displayModal");
	$("#navOverlay").removeClass("navOverlay");

}

var openModal = function(){
	$(this).children("div").addClass("displayModal").removeClass("modal");
	$("#navOverlay").addClass("navOverlay");
}

var login = function(){

	userInfo = $.cookie("userInfo");

	console.log(userInfo);

	if(userInfo !== undefined){

		if(userInfo.userID !== 0){
			$("#navMenu li").toggleClass("navVisible");
			$("#navUserEmail").text(userInfo.email);
			console.log("here");
		}
	}

}

var logOut = function(){

	$.removeCookie("userInfo");
	$("#navMenu li").toggleClass("navVisible");
	window.location = "index.php";

	
}
