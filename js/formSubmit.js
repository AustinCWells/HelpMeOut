$(document).ready(function(){


	$(".loginForm").submit(function(event){

		event.preventDefault();

		var user = {};
		var userInfo = {};

		user.email = $(this).children("#loginName").val();
		user.password = $(this).children("#loginPassword").val();
		//var password = CryptoJS.MD5($(this).children("#loginPassword").val());
		//user.password = password.toString(CryptoJS.enc.Hex);
		console.log(user);


		$.ajax({
			type: 'POST',
			url: 'api/index.php/login',
			content: 'application/json',
			data: JSON.stringify(user),
			success: function(data){
				console.log(data);
				var obj = JSON.parse(data);
				if(obj.info == false) {
					$("#loginModal").css({"border":"2px solid red"});
					$(".errorMessage").text("silly, your login information is not correct");
				}
				else if(data.error != undefined) {
					console.log(data.error);
				}
				else {
					obj = obj['info'];
					console.log("loading cookie");
					userInfo.userID = obj.user_id;
					userInfo.email = obj.email;
					userInfo.firstName = obj.first_name;
					userInfo.lastName = obj.last_name;

					console.log(obj);
				}
			},
			error: function( ){
				alert("WE'RE SORRY SOMETHING WENT WRONG")
			}
		});

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
		}


		console.log(accountInfo);

	});

	$(".jobPostForm").submit(function(){

		event.preventDefault();

		var jobPostInfo = {};

		jobPostInfo.category = $(this).children("#jobCategory").val();
		jobPostInfo.description = $(this).children("#jobDescription").val();
		jobPostInfo.price = parseInt($(this).children("#jobPrice").val(), 10);
		jobPostInfo.location = $(this).children("#jobLocation").val();
		jobPostInfo.deadlineDate = $(this).children("#jobDeadlineDate").val();
		jobPostInfo.deadlineTime = $(this).children("#jobDeadlineTime").val();
		jobPostInfo.notes = $(this).children("#jobNotes").val();

		console.log(jobPostInfo);

	});


	var marginLeft = $("input").css("margin-left");

	$("label").css("margin-left", marginLeft);

});
