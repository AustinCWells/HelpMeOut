$(document).ready(function(){

	$("form").submit(function(event){

		event.preventDefault();
		console.log("prevented Default submit");

	});

	$(".loginForm").submit(function(){

		var email = $(this).children("#loginName").val();
		var password = $(this).children("#loginPassword").val();
		console.log(email + "\n"  + password);

	});

	$(".accountForm").submit(function(){

		var accountInfo = {};

		accountInfo.firstName = $(this).children("#accountFName").val();
		accountInfo.lastName = $(this).children("#accountLName").val();
		accountInfo.number = $(this).children("#accountPhoneNumber").val();
		accountInfo.email = $(this).children("#accountEmail").val();
		var password = $(this).children().val();
		var confirmPassword = $(this).children().val();
		accountInfo.card = $(this).children.val();
		accountInfo.cardNumber = $(this).children.val();

		console.log(accountInfo);

	});

});
