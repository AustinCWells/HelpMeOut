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
		accountInfo.gender = $(this).children("#accountGender").val();
		accountInfo.birthDate = $(this).children("#accountBirthDate").val();
		var password = $(this).children("#accountPassword").val();
		var confirmPassword = $(this).children("#accountConfirmPassword").val();

		if(password !== confirmPassword){
			alert("Passwords do not match");
		}
			
		else{
			accountInfo.password = password; //add md5
		}


		console.log(accountInfo);

	});

	$(".jobPostForm").submit(function(){

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
	console.log(currentTime);

	$("input[type~='date'").val(currentTime);

	var marginLeft = $("input").css("margin-left");

	//console.log(marginLeft);

	$("label").css("margin-left", marginLeft);

});
