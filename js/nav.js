window.addEventListener('load', function(event) {

	var modalLinks = document.getElementsByClassName("modalLink");
	
	for(var i=0;i<modalLinks.length;i++) {
		$(modalLinks[i]).click(function(event) {
			 event.preventDefault();
			}
		);
	}

	var page = document.getElementsByClassName("currentPage")[0].getAttribute("id");
	if(page === "indexPage") {
		document.getElementById("indexHeader").style.background="rgb(34,46,64)";
	}
	if(page === "dashboardPage") {
		document.getElementById("dashboardHeader").style.background="rgb(34,46,64)";
	}
	if(page == "accountPage") {
		document.getElementById("accountHeader").style.background="rgb(34,46,64)";
	}
	
}, false);