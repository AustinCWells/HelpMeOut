$(document).ready(function(){


	$(".loginForm").submit(function(event){

		event.preventDefault();

		var email = $(this).children("#loginName").val();
		var password = CryptoJS.MD5($(this).children("#loginPassword").val());
		password = password.toString(CryptoJS.enc.Hex);
		console.log(email + "\n"  + password);

	});

	$(".accountForm").submit(function(event){

		event.preventDefault();

		var accountInfo = {};

		accountInfo.firstName = $(this).children("#accountFName").val();
		accountInfo.lastName = $(this).children("#accountLName").val();
		accountInfo.number = $(this).children("#accountPhoneNumber").val();
		accountInfo.email = $(this).children("#accountEmail").val();
		accountInfo.gender = $(this).children("#accountGender").val();
		accountInfo.birthDate = $(this).children("#accountBirthDate").val();
		var password = $(this).children("#accountPassword").val();
		var confirmPassword = $(this).children("#accountConfirmPassword").val();
		console.log(password + "\n" + confirmPassword);

		if(password !== confirmPassword){
			alert("Passwords do not match");
		}
			
		else{
			password = CryptoJS.MD5(password);
			accountInfo.password = password.toString(CryptoJS.enc.Hex);
		}


		console.log(accountInfo);

	});

	$(".jobPostForm").submit(function(){

		event.preventDefault();

		var jobPostInfo = {};

		jobPostInfo.category = $(this).children("#jobCategory").val();
		jobPostInfo.description = $(this).children("#jobDescription").val();
		jobPostInfo.price = $(this).children("#jobPrice").val();
		jobPostInfo.location = $(this).children("#jobLocation").val();
		jobPostInfo.deadlineDate = $(this).children("#jobDeadlineDate").val();
		jobPostInfo.deadlineTime = $(this).children("#jobDeadlineTime").val();
		jobPostInfo.notes = $(this).children("#jobNotes").val();

		console.log(jobPostInfo);

	});

	var currentTime = new Date();
	var year = currentTime.getFullYear();
	var month = parseInt(currentTime.getMonth(), 10) + 1;
	var day = parseInt(currentTime.getDate(), 10);
	if(day < 10)
		day = "0" + currentTime.getDate();
	if(month < 10)
		month = "0" + currentTime.getMonth();
	currentTime =  year + "-" + month + "-" + day;
	//console.log(currentTime);

	$("input[type~='date'").val(currentTime);

	var marginLeft = $("input").css("margin-left");

	$("label").css("margin-left", marginLeft);

});
