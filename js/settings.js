$(document).ready(function(){
	if(!checkLogin())
		window.location = "index.php";
});

$(window).ready(function(event) {

	var fileJSON = {};

	console.log(userInfo);	
	if(userInfo.is_custom === 0) {
		$("#imagePreview").attr("src", "img/fontenot.jpeg");
		$("#imagePreview").css("height", "100px");
		$("#imagePreview").css("width", "100px");
	}
	else {
		var imagePath = "img/user/" + userInfo.custom_image_path;
		$("#imagePreview").attr("src", imagePath);
		$("#imagePreview").css("height", "100px");
		$("#imagePreview").css("width", "100px");
	}

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
		updateInfo.password = $("#confirmPassword").val();
		updateInfo.user_id = userInfo.userID;


		//console.log(updateInfo);//Contains the user's password so not gunna log this

		var url = "api/updateaccount";
		$.ajax({
	        type: "POST",
	        url: url,
	        data: JSON.stringify(updateInfo),
	        content: 'application/json',
	        success: function (data) { 
	        	//should return userInfo
	        	console.log(data);
	        	var obj = JSON.parse(data);

	        	if(obj.success){
	        		updateAcount(updateInfo);
	        		obj.modal = "Account Info was successfully updated!";
	        		displaySuccess(obj);
        		}
        		else{
        			console.log(obj);
        			obj.modal = "Account Info Update Error";
        			displayError(obj);
        		}
			}
		});

	});


$("#uploadedFile").change(function() {
	readURL(this);
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();            
        reader.onload = function (e) {
            $("#imagePreview").attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);


         var filePath = $("#uploadedFile").val();


         fileJSON.user_id = userInfo.userID;
         fileJSON.file_path = filePath.substring(12);

	    }
}

$("#updatePicForm").submit(function(event){
	event.preventDefault();

	var file = $("#uploadedFile").prop('files')[0];

	var formData = new FormData(this);
	formData.append("file", file);


	$.ajax({
        url: 'api/uploadProfileImage',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) { 
        	console.log(data);
        	$.ajax({
	        url: "api/changeProfileImage",
	        type: "POST",
	        content: 'application/json',
			data: JSON.stringify(fileJSON),
			success: function (data) { 
		        	// console.log(data);
		        	// console.log(fileJSON);
				}
	    	});
        }
    });

});


	$("#updatePasswordForm").submit(function(event){

		event.preventDefault();

		if($("#newPassword").val() === $("#confirmNewPassword").val()) {
			var updatePass = {};
			updatePass.userID = userInfo.userID;
			updatePass.old_password = $("#currentPassword").val();
			updatePass.password = $("#newPassword").val();

			//console.log(updatePass);//Contains the user's password so not gunna log this

			var url = "api/updatepassword";
			$.ajax({
		        type: "Post",
		        url: url,
		        data: JSON.stringify(updatePass),
		        content: 'application/json',
		        success: function (data) { 
		        	console.log(data);
				}
			});
		}
		else {
			console.log("New password and confirm password did not match");
		}
	});


});

var updateAcount = function(info){

	userInfo.firstName = info.first_name;
	userInfo.lastName = info.last_name;
	userInfo.phone = info.phone;
	userInfo.email = info.email;
	$.cookie("userInfo", userInfo);

	$("#navUserEmail").text(userInfo.email);


}