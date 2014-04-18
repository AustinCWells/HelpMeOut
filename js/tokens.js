$(document).ready(function(){

	$("#paypay").submit(function(event){
		event.preventDefault();
		alert("This option is not live please use the on the left to update tokens");
		var purchase = parseInt($("#tokenAmount").val(), 10);
		console.log(purchase);

		$.ajax({
		type: 'POST',
		url: url,
		content: content,
		data: JSON.stringify(json),
		success: function(data){

			console.log(data);

			var obj = JSON.parse(data);



			if(Object.keys(obj)[0] === "error"){
				obj.modal = "Error occured while adding your tokens";

				displayError(obj);
			}

			else{

				if(type === "jobPost"){
					obj.modal = "Job Post was SuccesFul!";
					displaySuccess(obj);
				}

				else if(type === "login") {

					if(obj.userID){
						$.cookie("userInfo", obj);
						login();
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
	});

});