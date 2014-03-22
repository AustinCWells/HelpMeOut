ndow.addEventListener('load', function(event) {

	var ratingBar = document.getElementById("ratingFg");
	console.log(ratingBar);
	var percent = document.getElementById("ratingLabel");
	console.log(percent.innerHTML);
	$(ratingBar).width(percent.innerHTML);
	console.log("Rating Bar Width: " + ratingBar.width);

}, false);
