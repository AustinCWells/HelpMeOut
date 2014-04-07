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

		userInfo = $.cookie("userInfo");
		console.log(userInfo);
		var jobPostInfo = {};
		jobPostInfo.userID = userInfo.userID;
		jobPostInfo.category = $(this).children("#jobCategory").val();
		jobPostInfo.description = $(this).children("#jobDescription").val();
		jobPostInfo.price = parseInt($(this).children("#jobPrice").val(), 10);
		jobPostInfo.location = $(this).children("#jobLocation").val();
		jobPostInfo.deadlineDate = $(this).children("#jobDeadlineDate").val();
		jobPostInfo.deadlineTime = $(this).children("#jobDeadlineTime").val();
		jobPostInfo.notes = $(this).children("#jobNotes").val();

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
					$.cookie("userInfo", obj);
					login();
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
	$(id + " form").css({"left": left, "top": top});
	$("#modalOverlay").addClass("modalOverlay");
}

var login = function(){

	userInfo = $.cookie("userInfo");

	console.log(userInfo);

	if(userInfo !== undefined){

		if(userInfo.userID !== 0){
			$("#navMenu li").toggleClass("navVisible");
			$("#navUserEmail").text(userInfo.email);
			console.log("here");
		}
	}

}

