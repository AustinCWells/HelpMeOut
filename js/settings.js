$(window).ready(function(event) {

	$("#navSettings").addClass("currentPage").removeClass("hoverable");

	function phoneFormat(phone) {
	  phone = phone.replace(/[^0-9]/g, '');
	  phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
	  return phone;
	}

	var phoneNum = phoneFormat(userInfo.phone);

	$("#firstName").attr("placeholder", userInfo.firstName);
	$("#lastName").attr("placeholder", userInfo.lastName);
	$("#phoneNum").attr("placeholder", phoneNum);
	$("#email").attr("placeholder", userInfo.email);

		$("#phoneNum").keyup(function(event) {

		this.value = this.value.replace(/[^\d]/g, "");
		var length = this.value.length;
		if(this.value.length === 3)
			this.value = this.value.replace(/(\d{3})/, "$1-");
		else if (length <= 6)
			this.value = this.value.replace(/(\d{3})(\d{1,3})/, "$1-$2");
		else
			this.value = this.value.replace(/(\d{3})(\d{3})(\d{1,44})/, "$1-$2-$3");

	});


	$("#updateAccountForm").submit(function(event){

		event.preventDefault();

		var updateInfo = {};
		if($("#firstName").val() != "")
			updateInfo.first_name = $("#firstName").val();
		else {
			//console.log("first name empty");
			updateInfo.first_name = userInfo.firstName;
		}
		if($("#lastName").val() != "")
			updateInfo.last_name = $("#lastName").val();
		else {
			//console.log("last name empty");
			updateInfo.last_name = userInfo.lastName;
		}
		if($("#phoneNum").val() != "")
			updateInfo.phone = $("#phoneNum").val();
		else {
			//console.log("phone # empty");
			updateInfo.phone = userInfo.phone;
		}
		if($("#email").val() != "")
			updateInfo.email= $("#email").val();
		else {
			//console.log("email empty");
			updateInfo.email = userInfo.email;
		}
		updateInfo.user_id = userInfo.userID;

		console.log(updateInfo);

		var url = "api/updateaccount";
		$.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(updateInfo),
        content: 'application/json',
        success: function (data) { 
        	console.log(data);
		}
	});
	});


$("#updatePicForm").submit(function(event){

		event.preventDefault();

		var updateInfo = {};
		updateInfo.file_path = $("#uploadedFile").val();
		updateInfo.user_id = userInfo.userID;

		console.log(updateInfo);

		var url = "api/changeProfileImage";
		$.ajax({
	        type: "Post",
	        url: url,
	        data: updateInfo,
	        content: 'application/json',
	        success: function (data) { 
	        	console.log(data);
			}
		});
	});


	$("#updatePasswordForm").submit(function(event){

		event.preventDefault();

		var updateInfo = {};
		if($("#newPassword").val() === $("#confirmPassword").val()) {
		updateInfo.password = $("#newPassword").val();
		updateInfo.user_id = userInfo.userID;

		console.log(updateInfo);

		var url = "api/updatepassword";
		$.ajax({
	        type: "Post",
	        url: url,
	        data: updateInfo,
	        content: 'application/json',
	        success: function (data) { 
	        	console.log(data);
			}
		});
	}
	});


});