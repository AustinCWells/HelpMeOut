$(document).ready(function(){

	$("#paypay").submit(function(event){
		event.preventDefault();
		//alert("This option is not live please use the on the left to update tokens");
		var tokens = {};
		tokens.new_tokens = parseInt($("#tokenAmount").val(), 10);
		tokens.user_id = userInfo.userID;
		var current = userInfo.tokens;
		var update = tokens.new_tokens + current;
		//console.log(update);


			$.ajax({
			type: 'POST',
			url: 'api/addTokens',
			content: 'application/json',
			data: JSON.stringify(tokens),
			success: function(data){

				console.log(data);

				var obj = JSON.parse(data);



				if(Object.keys(obj)[0] === "error"){
					obj.modal = "Error occured while adding your tokens";
					displayError(obj);
				}

				else{

					obj.modal = "Your token purchase was successful!";
					displaySuccess(obj);
					userInfo.tokens = update;
					$.cookie("userInfo", userInfo);
					$(".tokenCount").text(userInfo.tokens);

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
