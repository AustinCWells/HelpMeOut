window.addEventListener('load', function(event) {

	$('#ratingLabel').append('75%'/*get the rating%*/);
	var ratingBar = document.getElementById("ratingFg");
	var percent = document.getElementById("ratingLabel");
	$(ratingBar).width(percent.innerHTML);

}, false);