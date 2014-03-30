var userInfo = {};

$(window).ready(function(event) {

	$.cookie.json = true;

	login();

	$("li").hover(

		function(){
			$(this).addClass("selected");
		},
		function(){
			$(this).removeClass("selected");
		}
	);

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


		$.ajax({
			type: 'POST',
			url: 'api/login',
			content: 'application/json',
			data: JSON.stringify(user),
			success: function(data){
				
				var obj = JSON.parse(data);
				//console.log(obj);

				if(obj.userID == false) {
					$("#loginModal").css({"border":"2px solid red"});
					$(".errorMessage").text("silly, your login information is not correct");
				}
				else if(data.error != undefined) {
					console.log(data.error);
				}
				else {
					//obj = obj['info'];
					//userInfo = obj;
					$.cookie("userInfo", obj);
					login();

					//console.log(obj);
					//closeModal();
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

			$.ajax({
			type: 'POST',
			url: 'api/login',
			content: 'application/json',
			data: JSON.stringify(accountInfo),
			success: function(data){
				//data should same as when logged in
				var obj = JSON.parse(data);
				//console.log(obj);

				if(obj.info == false) {
					alert("Something went wrong");
				}
				else if(data.error != undefined) {
					console.log(data.error);
				}
				else {

					$.cookie("userInfo", obj);
					login();
				}
			},
			error: function( ){
				alert("WE'RE SORRY SOMETHING WENT WRONG")
			}
		});
		}


		console.log(accountInfo);

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

		console.log(jobPostInfo);

		$.ajax({
			type: 'POST',
			url: 'api/login',
			content: 'application/json',
			data: JSON.stringify(jobPostInfo),
			success: function(data){
				
				var obj = JSON.parse(data);
				//console.log(obj);

				if(obj.userID == false) {
					alert("Something went wrong");
				}
				else if(data.error != undefined) {
					console.log(data.error);
				}
				else {
					console.log("Job is Posted");
				}
			},
			error: function( ){
				alert("WE'RE SORRY SOMETHING WENT WRONG")
			}
		});

	});

	$("#navLogOut a").click(function(event){

		event.preventDefault();
		logOut();
	});

	var width = $("li#navUser").width();
	console.log(width);
	$("#userNav li").width(width);


	var marginLeft = $("input").css("margin-left");

	$("label").css("margin-left", marginLeft);
	
});

var closeModal = function(){
	
	$(this).parent().parent().addClass("modal").removeClass("displayModal");
	$("#navOverlay").removeClass("navOverlay");

}

var openModal = function(){
	$(this).children("div").addClass("displayModal").removeClass("modal");
	$("#navOverlay").addClass("navOverlay");
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

var logOut = function(){

	$.removeCookie("userInfo");
	$("#navMenu li").toggleClass("navVisible");
	
}
