window.onload=function(){
var loginButton = document.getElementsByClassName('login');
var paymentButton = document.getElementsByClassName('pay'); 
var accountButton = document.getElementsByClassName('createAccount'); 
var postJobButton = document.getElementsByClassName("postJob"); 
var overlay = document.getElementById('overlay'); 
var closeX = document.getElementsByClassName('close'); 



for(var i= 0; i < closeX.length; i++)
{
	closeX[i].addEventListener('click',hideModal); 
}
overlay.addEventListener('click',hideModal); 
for(var i = 0; i < loginButton.length; i++)
{
	loginButton[i].addEventListener('click',displayLoginModal);
}
for(var i = 0; i < paymentButton.length; i++)
{
	paymentButton[i].addEventListener('click',loadPaymentInfo);
	paymentButton[i].addEventListener('click',displayPayModal);
}
for(var i = 0; i < accountButton.length; i++)
{
	accountButton[i].addEventListener('click',displayAccountModal);
}

for(var i = 0; i < postJobButton.length; i++)
{
	postJobButton[i].addEventListener('click',displayJobPostModal);
}


function loadPaymentInfo()
{
	console.log("fetching payment info"); 
	var user_id =  $.cookie("user_id"); //$.cookie(''); 
	var user = new Object();
	user.user_id = user_id; 
	if(!user_id){
		console.log("user_id not defined.");
	} else {
		console.log("user id defined, getting login info");

		$.ajax({
			type: 'POST',
			url: '/api/paymentinfo',
			content: 'application/json',
			data: JSON.stringify(user),
			success: function(data){
				var obj = JSON.parse(data); 
				$("input[name=creditNumber]").val(obj.info.credit_no);
				$("input[name=fname]").val(obj.info.given_name);
				$("input[name=lname]").val(obj.info.surname);
				var selector = "select.formElement[name=card] option[value=" + obj.info.credit_type + "]";
				$(selector).prop('selected', true);
			},
			error: function(){
				alert("OH NO! someone has gone and screwed up."); 
			}
		});

	}
}


function displayLoginModal()
{

	displayModal('loginModal');
}
function displayPayModal()
{
	displayModal('paymentModal');
}
function displayAccountModal()
{
	displayModal('accountModal');
}
function displayJobPostModal()
{
	displayModal('jobPostModal');
}

function displayModal(modalId)
{
	var modal = document.getElementById(modalId)
	var background = document.getElementById("overlay");
	console.log("got backgroun" + background);
	background.className = "overlay"
	modal.className = "displayModal";
	var width = modal.clientWidth; 
	var height = modal.clientHeight; 
	var displacementX = '-'+ (width/2) + 'px';
	var displacementY = '-' + (height/2) + 'px';   
	modal.style.marginLeft = displacementX;
	modal.style.marginTop = displacementY; 


}



function hideModal()
{
	document.getElementById('loginModal').className = "modal";
	document.getElementById('jobPostModal').className = "modal";
	document.getElementById('accountModal').className = "modal";
	if(document.getElementById('mapModal'))
	{
		document.getElementById('mapModal').className = "modal";
	}
	document.getElementById("overlay").className = "";  


}

}

$(window).ready(function(){

	$("#postJobHeader").click(function(){

		var currentTime = new Date();
		var hours = currentTime.getHours();
		var mins = currentTime.getMinutes();
		var year = currentTime.getFullYear();
		var month = parseInt(currentTime.getMonth(), 10) + 1;
		var day = parseInt(currentTime.getDate(), 10);
		if(day < 10)
			day = "0" + currentTime.getDate();
		if(month < 10)
			month = "0" + currentTime.getMonth();
		currentTime =  year + "-" + month + "-" + day;
		
		if(hours < 10)
			hours = "0" + hours.toString();
		else
			hours = hours.toString();

		if(mins < 10)
			mins = "0" + mins.toString();
		else
			mins = mins.toString();

		var time = hours + ":" + mins;

		$("input[type='time']").val(time);

		$("input[type~='date'").val(currentTime);
	});

});