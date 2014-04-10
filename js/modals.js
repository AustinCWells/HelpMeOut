//LIST OF FUNCTIONS:
//loginForm --- api/login
//accountForm --- api/newaccount
//jobPostForm --- api/postatask



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

		accountInfo.firstName = $("#accountFName").val();
		accountInfo.lastName = $("#accountLName").val();
		accountInfo.number = $("#accountPhoneNumber").val();
		accountInfo.email = $("#accountEmail").val();
		accountInfo.gender = parseInt($('[name=accountGender]:checked').val(), 10);
		accountInfo.birthDate = $("#accountBirthDate").val();
		var password = $("#accountPassword").val();
		var confirmPassword = $("#accountConfirmPassword").val();
		console.log(password + "\n" + confirmPassword);
		console.log(accountInfo);

		if(password !== confirmPassword){
			alert("Passwords do not match");
		}
			
		else{

			//password = CryptoJS.MD5(password);
			//accountInfo.password = password.toString(CryptoJS.enc.Hex);
			accountInfo.password = password;
			dbRequest('api/newaccount', 'application/json', accountInfo, 'signUp');

		}

	});

	$(".jobPostForm").submit(function(event){

		event.preventDefault();
		console.log("Posting a Job")

		userInfo = $.cookie("userInfo");
		console.log(userInfo);
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

	$(".modal").hide();
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

			if(data[0] !== '{'){
				alert("Database Error");
				console.log(data);
			}

			else{
				var obj = JSON.parse(data);
				console.log(obj);

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
	$("#modalOverlay").removeClass("modalOverlay");

}

var openModal = function(id){

	var windowWidth = $(window).width() / 2;
	var windowHeight = $(window).height() / 2;
	console.log(windowWidth);
	$(id).show();
	$(id).addClass("modalSelected");
	var formWidth = 12 + ($(id + " form").width() / 2);
	var formHeight = 12 + ($(id + " form").height() / 2);
	var left = windowWidth - formWidth;
	var top = windowHeight - formHeight;
	$(id).css({"left": left, "top": top});
	$("#modalOverlay").addClass("modalOverlay");

	if(id === "#jobPostModal"){
		var currentTime = getCurrentTimeAndDate();
		$("#jobDeadlineDate").val(currentTime.date);
		$("#jobDeadlineDate").attr('min',currentTime.date);
		$("#jobDeadlineTime").val(currentTime.time);
		$("#jobDeadlineTime").attr('min',currentTime.time);
		//console.log(currentTime);
	}
}

var login = function(){

	userInfo = $.cookie("userInfo");

	console.log(userInfo);

	if(userInfo !== undefined){

		if(userInfo.userID !== 0){
			$("#navMenu li").toggleClass("navVisible");
			$("#navUserEmail").text(userInfo.email);
			$("#tokenCount").text(userInfo.tokens);
			console.log("here");
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

































