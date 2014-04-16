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
	var deadlineDate = $("#jobDeadlineDate");
	var deadlineTime = $("#jobDeadlineTime");

}

var checkSignUpValidity = function(){

	var password = $("#accountPassword");
	var confirmPassword = $("#accountConfirmPassword");

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
		accountInfo.gender = parseInt($('[name=accountGender]:checked').val(), 10);
		accountInfo.birthDate = $("#accountBirthDate").val();
		accountInfo.password= $("#accountPassword").val();

		dbRequest('api/newaccount', 'application/json', accountInfo, 'signUp');

	});

	$("#accountPhoneNumber").keyup(function(event) {

		this.value = this.value.replace(/[^\d]/g, "");
		var length = this.value.length;
		if(this.value.length === 3)
			this.value = this.value.replace(/(\d{3})/, "$1-");
		else if (length <= 6)
			this.value = this.value.replace(/(\d{3})(\d{1,3})/, "$1-$2");
		else
			this.value = this.value.replace(/(\d{3})(\d{3})(\d{1,44})/, "$1-$2-$3");

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

			console.log(data);

			var obj = JSON.parse(data);

			if(Object.keys(obj)[0] === "error"){
				displayError(obj.error.text);
			}

			else{
	
				//console.log(obj);

				if(type === "jobPost"){
					if(obj.success)
						console.log("Job was Posted");
					else
						console.log("Job failed to Post");
				}

				else if(type === "login" || type === "signUp"){
					$.cookie("userInfo", obj);
					login();
				}

				closeModal();
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
	var formWidth = 12 + ($(".modalSelected").width() / 2);
	var formHeight = 12 + ($(".modalSelected").height() / 2);
	var left = windowWidth - formWidth;
	var top = windowHeight - formHeight;
	$(".modalSelected").css({"left": left, "top": top});

	$(".modalOverlay").height($(document).height());

});

var openModal = function(id){

	var windowWidth = $(window).width() / 2;
	var windowHeight = $(window).height() / 2;
	//console.log(windowWidth);
	$(id).show();
	$(id).addClass("modalSelected");
	var formWidth = 12 + ($(id + " form").width() / 2);
	var formHeight = 12 + ($(id + " form").height() / 2);
	var left = windowWidth - formWidth;
	var top = windowHeight - formHeight;
	$(id).css({"left": left, "top": top});

	$("#modalOverlay").addClass("modalOverlay");
	$(".modalOverlay").height($(document).height());

	if(id === "#jobPostModal"){
		var currentTime = getCurrentTimeAndDate();
		$("#jobDeadlineDate").val(currentTime.date);
		$("#jobDeadlineDate").attr('min',currentTime.date);
		$("#jobDeadlineTime").val(currentTime.time);
		$("#jobDeadlineTime").attr('min',currentTime.time);
		setJobPostDimensions();
		//console.log(currentTime);
	}
}

var login = function(){

	userInfo = $.cookie("userInfo");

	//console.log(userInfo);

	if(userInfo !== undefined){

		if(userInfo.userID !== 0){
			$("#navMenu li").toggleClass("navVisible");
			$("#navUserEmail").text(userInfo.email);
			$("#tokenCount").text(userInfo.tokens);
		}
	}

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
	console.log(info);
}

































