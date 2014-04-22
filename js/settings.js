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


	$("#updateForm").submit(function(event){

		event.preventDefault();
		//console.log("Posting a Job")

		//checkJobPostValidity();

		var updateInfo = {};
		updateInfo.first_name = $("#firstName").val();
		updateInfo.last_name = $("#lastName").val();
		updateInfo.phone = $("#phoneNum").val();
		updateInfo.email= $("#email").val();
		updateInfo.user_id = userInfo.userID;

		console.log(updateInfo);

		var url = "api/updateaccount";
		$.ajax({
        type: "Post",
        url: url,
        data: updateInfo, //Data to POST to the server
        content: 'application/json',
        success: function (data) { 
        	console.log("Successfully updated.");
		}
	});
	});


});