$(document).ready(function(){

	$("form").submit(function(event){

		event.preventDefault();
		console.log("prevented Default submit");

	});

});