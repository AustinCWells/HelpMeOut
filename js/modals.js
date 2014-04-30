//LIST OF FUNCTIONS:
//loginForm --- api/login
//accountForm --- api/newaccount
//jobPostForm --- api/postatask

var checkJobPostValidity = function(){

	var description = $("#jobDescription");
	if($(description).val() == ""){
		//console.log("Setting");
		description[0].setCustomValidity("Job Description is required!");
	}
	else{
		//console.log("Unsetting");
		description[0].setCustomValidity('');
	}

	var category = $("#jobCategory");

	if($(category).val() == "0"){
		//console.log("Setting");
		category[0].setCustomValidity("Job Category is required!");
	}
	else{
		//console.log("Unsetting");
		category[0].setCustomValidity('');
	}

	var price = $("#jobPrice");

	if(parseInt($(price).val(), 10) < 2){
		//console.log("Setting");
		price[0].setCustomValidity("Correct price is required!");
	}
	else{
		//console.log("Unsetting");
		price[0].setCustomValidity('');
	}

	var location = $("#jobLocation");

	if($(location).val() == ""){
		//console.log("Setting");
		location[0].setCustomValidity("Job Location is required!");
	}
	else{
		location[0].setCustomValidity('');
	}
	var time = new Date();
	var minTime = time.getTime() + 1800000;
	var deadline = {};
	deadline.time = $("#jobDeadlineTime").val();
	deadline.date = $("#jobDeadlineDate").val();
	//console.log(deadline);
	time = getRequestTime(deadline);
	//console.log(time);
	timeBox = $("#jobDeadlineTime");

	if(time.getTime() < minTime){
		//console.log("bad time")
		timeBox[0].setCustomValidity("Job must have a least 30 minutes in the future!");
	}
	else{
		//console.log("good time");
		timeBox[0].setCustomValidity('');
	}

}

var checkSignUpValidity = function(){

	var password = $("#accountPassword");
	var confirmPassword = $("#accountConfirmPassword");

	var phone = $("#accountPhoneNumber");

	if($(phone).val().length < 10){
		phone[0].setCustomValidity("Phone Number must be 10 digits long!");
	}
	else
		phone[0].setCustomValidity('');

	if($(password).val() !== $(confirmPassword).val()){
		//console.log("Setting");
		confirmPassword[0].setCustomValidity("Passwords do not match!");
	}
	else{
		//console.log("Unsetting");
		confirmPassword[0].setCustomValidity('');
	}

}

$(window).ready(function(){

	$("#loginForm").submit(function(event){

		event.preventDefault();

		var user = {};
		var isLog = false;

		user.email = $("#loginEmail").val();
		user.password = $("#loginPassword").val();

		dbRequest('api/login', 'application', user, 'login');
		
	});

	$(".accountForm").change(checkSignUpValidity);
	$(".accountForm").submit(function(event){

		event.preventDefault();

		var accountInfo = {};

		accountInfo.firstName = $("#accountFName").val();
		accountInfo.lastName = $("#accountLName").val();
		accountInfo.number = $("#accountPhoneNumber").val();
		accountInfo.email = $("#accountEmail").val();
		accountInfo.gender = $('[name=accountGender]:checked').val();
		accountInfo.birthDate = $("#accountBirthDate").val();
		accountInfo.password= $("#accountPassword").val();

		dbRequest('api/newaccount', 'application/json', accountInfo, 'signUp');

	});

	$("#accountPhoneNumber").keyup(function(event) {

		this.value = this.value.replace(/[^\d]/g, "");
		var length = this.value.length;

		if(event.keyCode !== 46){
			if(this.value.length === 4)
				this.value = this.value.replace(/(\d{3})/, "$1-");
			else if (length <= 6)
				this.value = this.value.replace(/(\d{3})(\d{1,3})/, "$1-$2");
			else
				this.value = this.value.replace(/(\d{3})(\d{3})(\d{1,44})/, "$1-$2-$3");
		}

	});

	$(".jobPostForm").change(checkJobPostValidity);

	$(".jobPostForm").submit(function(event){

		event.preventDefault();
		console.log("Posting a Job")

		//checkJobPostValidity();

		var jobPostInfo = {};
		jobPostInfo.userID = userInfo.userID;
		jobPostInfo.category = parseInt($("#jobCategory").val(), 10);
		jobPostInfo.description = $("#jobDescription").val();
		jobPostInfo.price = parseInt($("#jobPrice").val(), 10);
		jobPostInfo.location = $("#jobLocation").val();
		jobPostInfo.deadlineDate = $("#jobDeadlineDate").val();
		jobPostInfo.deadlineTime = $("#jobDeadlineTime").val();
		jobPostInfo.notes = $("#jobNotes").val();
		console.log(jobPostInfo);

		dbRequest('api/postatask', 'application/json', jobPostInfo, 'jobPost');
	});

	$(".offerHelp").submit(function(event){

		event.preventDefault();
		var info = {};
		info.modal = "Offer Help";
		info.error = {};

		if(checkLogin()){

			if(userInfo.tokens){

				var offer = {};
				offer.task_id = parseInt($("#modalTaskId").val(), 10);
				offer.user_id = userInfo.userID;
				console.log(offer);
				dbRequest('api/makeOffer', 'application/json', offer, 'offerHelp');

			}

			else {

				info.error.text = "Must have tokens to offer help!";
				closeModal();
				displayError(info);

			}

		}
		else{
			info.error.text = "Need to be logged in to offer help!";
			closeModal();
			displayError(info);
		}
	});

	$(".modalLink").click(function(event){
		event.preventDefault();
		openModal($(this).attr('href'));
	});

	$("#modalOverlay").click(function(){
		closeModal();
	});

	$(".modal").hide();//TODO: Move this outside of window-onready or into the CSS so that modals do not briefly appear on page load;
	$("#jobPrice").change(function(){
		var num = $(this).val();
		num = parseInt(num, 10).toFixed(2);
		$(this).val(num);
	});

	$(".closeButton").click(function(event){

		event.preventDefault();
		closeModal();

	});


});

//CHRIS --- WHAT DOES THIS DO?
	//Can you explain how this works to the DB guys?
var dbRequest = function(url, content, json, type){

	$.ajax({
		type: 'POST',
		url: url,
		content: content,
		data: JSON.stringify(json),
		success: function(data){

			//console.log(data);

			var obj = JSON.parse(data);



			if(Object.keys(obj)[0] === "error"){
				if(type === "jobPost")
					obj.modal = "Job Post Error!";
				else if(type === "login")
					obj.modal = "Login Error!";
				else if(type === "signUp")
					obj.modal = "Sign Up Error!";
				else if(type === "offerHelp")
					obj.modal = "Offer Help Error!";

				displayError(obj);
			}

			else{
	
				//console.log(obj);

				closeModal();

				if(type === "jobPost"){
					obj.modal = "Job Post was SuccesFul!";
					$("#jobCategory").val('0');
					$("#jobDescription").val('');
					$("#jobPrice").val("3.00");
					$("#jobLocation").val('');
					$("#jobNotes").val('');
					displaySuccess(obj);

				}

				else if(type === "offerHelp"){
					obj.modal = "You succesfully offer help!";
					displaySuccess(obj);
				}

				else if(type === "login") {

					if(obj.userID){
						$.cookie("userInfo", obj);
						login();
						refreshAllJobs();
						refreshRecentJobs();
					}

					else{
						obj.modal = "Login in Failure!";
						displayError(obj);
					}

				}

				else if(type === "signUp"){
					$.cookie("userInfo", obj);
					login();
					obj.modal = "Sign Up was SuccesFul!";
					displaySuccess(obj);
				}

			}

		},

		//CAN WE MAKE THIS ERROR MESSAGE MORE SPECIFIC?
		//IF THIS IS BECAUSE OF A BROKEN LINK BETWEEN
			//MODALS AND API, CAN WE MENTION THAT?

		error: function(data){
			alert("WE'RE SORRY SOMETHING WENT WRONG!");
		}

	});

}

var closeModal = function(){
	
	//$(".modalSelected").removeClass("modalSelected");
	$(".modal").hide();
	$(".modalOverlay").height(0);
	$("#modalOverlay").removeClass("modalOverlay");

}

$(window).resize(function(){

	var windowWidth = $(window).width() / 2;
	var windowHeight = $(window).height() / 2;
	var modalWidth = ($(".modalSelected").width() / 2);
	var modalHeight = ($(".modalSelected").height() / 2);
	var left = windowWidth - modalWidth;
	var top = windowHeight - modalHeight;
	$(".modalSelected").css({"left": left, "top": top});

	$(".modalOverlay").height($(document).height());

});

var openModal = function(id){

	var windowWidth = $(window).width() / 2;
	var windowHeight = $(window).height() / 2;
	//console.log(windowWidth);
	$(id).show();
	$(id).addClass("modalSelected");
	var modalWidth = ($(".modalSelected").width() / 2);
	var modalHeight = ($(".modalSelected").height() / 2);
	var left = windowWidth - modalWidth;
	var top = windowHeight - modalHeight;
	$(id).css({"left": left, "top": top});

	$("#modalOverlay").addClass("modalOverlay");
	$(".modalOverlay").height($(document).height());

	if(id === "#jobPostModal"){
		var currentTime = getCurrentTimeAndDate();
		$("#jobDeadlineDate").val(currentTime.date);
		$("#jobDeadlineTime").val(currentTime.time);
		setJobPostDimensions();
		//console.log(currentTime);
	}
}

var getRequestTime = function(info){

	var hours = parseInt(info.time.substring(0, 2), 10);
	var mins = parseInt(info.time.substring(3), 10);
	var year = parseInt(info.date.substring(0, 4), 10);
	var month = parseInt(info.date.substring(5, 7), 10) - 1;
	var day = parseInt(info.date.substring(8), 10);
	/*console.log(hours);
	console.log(mins);
	console.log(year);
	console.log(month);
	console.log(day);*/

	var time = new Date();
	//console.log(time);
	time.setFullYear(year, month, day);
	time.setHours(hours, mins, 0, 0);

	return time;
}

var getCurrentTimeAndDate = function(){

	var info = {};

	var currentTime = new Date();

	var hours = currentTime.getHours();
	var mins = currentTime.getMinutes();

	var year = currentTime.getFullYear();
	var month = parseInt(currentTime.getMonth(), 10) + 1;
	var day = parseInt(currentTime.getDate(), 10);

	if(month < 10)
		month = "0" + month;

	if(day < 10)
		day = "0" + day;

	info.date = year + "-" + month + "-" + day;

	if(hours < 10)
		hours = "0" + hours.toString();
	else
		hours = hours.toString();

	if(mins < 10)
		mins = "0" + mins.toString();
	else
		mins = mins.toString();

	info.time = hours + ":" + mins;

	return info;

}

var setJobPostDimensions = function(){

	var widthText = $("#jobDescription").width();
	//console.log(widthText);
	$(".jobPostForm input").width(widthText);
	$(".jobPostForm select").width(widthText);
	$(".jobPostForm textarea").width(widthText);

}

var displayError = function(info){
	closeModal();

	openModal("#errorModal");
	$(".errorTitle").text(info.modal);
	if(info.modal === "Login in Failure!"){
		$("#errorInfo").text("Email and password do not match!");
	}
	else
		$("#errorInfo").text(info.error.text);

	//console.log(info);

}

var displaySuccess = function(info){

	closeModal();

	openModal("#successModal");
	$(".successTitle").text(info.modal);
	console.log(info);
}

































