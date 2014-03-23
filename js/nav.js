window.addEventListener('load', function(event) {

	var modalLinks = document.getElementsByClassName("modalLink");
	
	for(var i=0;i<modalLinks.length;i++) {
		$(modalLinks[i]).click(function(event) {
			 event.preventDefault();
			}
		);
	}
	
}, false);