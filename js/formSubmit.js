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
		var password = $(this).children("#accountPassword").val();
		var confirmPassword = $(this).children("#accountConfirmPassword").val();
		if(password !== confirmPassword)
			alert("Passwords to not match");
		else
			accountInfo.password = password; //add md5
		accountInfo.card = $(this).children("#accountCreditCard").val();
		accountInfo.cardNumber = $(this).children("#accountCreditCardNumber").val();

		console.log(accountInfo);

	});

	$(".jobPostForm").submit(function(){

		var jobPostInfo = {};

		jobPostInfo.category = $(this).children("#jobCategory").val();
		jobPostInfo.description = $(this).children("#jobDescription").val();
		jobPostInfo.payment = $(this).children("#jobPaymentAmount").val();
		jobPostInfo.location = $(this).children("#jobLocation").val();
		jobPostInfo.deadlineDate = $(this).children("#jobDeadlineDate").val();
		jobPostInfo.deadlineTime = $(this).children("#jobDeadlineTime").val();
		jobPostInfo.notes = $(this).children("#jobNotes").val();

		console.log(jobPostInfo);

	});

});
