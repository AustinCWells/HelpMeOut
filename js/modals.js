$(window).ready(function(){


	$("#loginForm").submit(function(event){

		event.preventDefault();

		var user = {};
		var isLog = false;
		//console.log($.coookie("userInfo"));

		user.email = $(this).children("#loginEmail").val();
		user.password = $(this).children("#loginPassword").val();
		//var password = CryptoJS.MD5($(this).children("#loginPassword").val());
		//user.password = password.toString(CryptoJS.enc.Hex);
		console.log(user);

		dbRequest('api/login', 'application', user, 'login');
		
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

			//password = CryptoJS.MD5(password);
			//accountInfo.password = password.toString(CryptoJS.enc.Hex);
			accountInfo.password = password;
			dbRequest('api/login', 'application/json', accountInfo, 'signUp');

		}

	});

	$(".jobPostForm").submit(function(event){

		event.preventDefault();
		console.log("Posting a Job")

		var jobPostInfo = {};

		jobPostInfo.category = $(this).children("#jobCategory").val();
		jobPostInfo.description = $(this).children("#jobDescription").val();
		jobPostInfo.price = parseInt($(this).children("#jobPrice").val(), 10);
		jobPostInfo.location = $(this).children("#jobLocation").val();
		jobPostInfo.deadlineDate = $(this).children("#jobDeadlineDate").val();
		jobPostInfo.deadlineTime = $(this).children("#jobDeadlineTime").val();
		jobPostInfo.notes = $(this).children("#jobNotes").val();

		dbRequest('api/login', 'application/json', jobPostInfo, 'jobPost');

});


var dbRequest = function(url, content, json, type){

	.ajax({
		type: 'POST',
		url: url,
		content: content,
		data: JSON.stringify(json),
		success: function(data){

			if(data[0] !== '{'){
				alert("Database Error");
				console.log(data);
			}

			else{
				var obj = JSON.parse(data);

				if(type === "jobPost"){
					if(obj.success)
						console.log("Job was Posted");
					else
						console.log("Job failed to Post");
				}

				else if(type === "login" || type === "signUp"){
					console.log(obj);
				}
			}

		},
		error: function(data){
			alert("WE'RE SORRY SOMETHING WENT WRONG!");
		}

	});

}