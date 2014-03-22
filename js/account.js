window.addEventListener('load', function(event) {

	var ratingBar = document.getElementById("ratingFg");
	var percent = document.getElementById("ratingLabel");
	$(ratingBar).width(percent.innerHTML);

}, false);
