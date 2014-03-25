$(window).ready(function(event) {

	$.cookie.json = true;

	var userInfo = $.cookie("userInfo");

	userInfo = {};

	if(userInfo === undefined){
		alert("Your are not loged in.");
	}


	else{

		console.log("here");


		var page = document.getElementsByClassName("currentPage")[0].getAttribute("id");
		if(page === "indexPage") {
			document.getElementById("indexHeader").style.background="rgb(34,46,64)";
			document.getElementById("indexHeader").getElementsByTagName('a')[0].style.color="rgb(255,255,255)";
			$("#indexHeader").removeClass("hoverable");
		}
		if(page === "dashboardPage") {
			document.getElementById("dashboardHeader").style.background="rgb(34,46,64)";
			document.getElementById("dashboardHeader").getElementsByTagName('a')[0].style.color="rgb(255,255,255)";
			$("#dashboardHeader").removeClass("hoverable");
		}
		if(page == "accountPage") {
			document.getElementById("accountHeader").style.background="rgb(34,46,64)";
			document.getElementById("accountHeader").getElementsByTagName('a')[0].style.color="rgb(255,255,255)";
			$("#accountHeader").removeClass("hoverable");
		}

	}
	
});