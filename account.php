	<?php include "components/header.html" ?>
	<script language="javascript"  type="text/javascript" src="js/account.js"> </script> 
	<script language="javascript"  type="text/javascript" src="js/rating.js"> </script> 
</head>
<body class="blue">
	<!--<span class="currentPage" id="accountPage"></span>-->

<div class="row yellow">
	<div class="twelve columns">
		<p>WHO WANT'S THIS FONTENOT?</p>	
	</div>
</div>
<br>

<div class="row">
	<div class="twelve columns">
		<div id="profile">
			<div class="profileSection">
				<div class = "five column">
					<img src="" id="profilePic">
					<div id="contactInfo">
					</div>
				</div>
				<div class = "six column">
					<div class = "six column ratingDiv center">Reliability Rating:
						<div class="row">
					        <div class="starRating">
								<div>
							    	<div>
							      		<div>
							        		<div>
							          			<input id="reliabilityRatingProfile1" type="radio" name="reliabilityRatingProfile" value="1" disabled="true">
							       			  	<label for="reliabilityRatingProfile1"><span>1</span></label>
								    			</div>
								    		    <input id="reliabilityRatingProfile2" type="radio" name="reliabilityRatingProfile" value="2" disabled="true">
								   		     	<label for="reliabilityRatingProfile2"><span>2</span></label>
								   		   	</div>
								  		   	<input id="reliabilityRatingProfile3" type="radio" name="reliabilityRatingProfile" value="3" disabled="true">
										    <label for="reliabilityRatingProfile3"><span>3</span></label>
									    </div>
									    <input id="reliabilityRatingProfile4" type="radio" name="reliabilityRatingProfile" value="4" disabled="true">
									    <label for="reliabilityRatingProfile4"><span>4</span></label>
								  	</div>
								<input id="reliabilityRatingProfile5" type="radio" name="reliabilityRatingProfile" value="5" disabled="true">
								<label for="reliabilityRatingProfile5"><span>5</span></label>
							</div>
					    </div>
		       		</div>
					<div class = "six column ratingDiv center">Speed Rating:
						<div class="row">
					        <div class="starRating">
								<div>
							    	<div>
							      		<div>
							        		<div>
							          			<input id="speedRatingProfile1" type="radio" name="speedRatingProfile" value="1" disabled="true">
							       			  	<label for="speedRatingProfile1"><span>1</span></label>
								    			</div>
								    		    <input id="speedRatingProfile2" type="radio" name="speedRatingProfile" value="2" disabled="true">
								   		     	<label for="speedRatingProfile2"><span>2</span></label>
								   		   	</div>
								  		   	<input id="speedRatingProfile3" type="radio" name="speedRatingProfile" value="3" disabled="true">
										    <label for="speedRatingProfile3"><span>3</span></label>
									    </div>
									    <input id="speedRatingProfile4" type="radio" name="speedRatingProfile" value="4" disabled="true">
									    <label for="speedRatingProfile4"><span>4</span></label>
								  	</div>
								<input id="speedRatingProfile5" type="radio" name="speedRatingProfile" value="5" disabled="true">
								<label for="speedRatingProfile5"><span>5</span></label>
							</div>
					    </div>
		       		</div>
	       		</div>
	       		<div class = "two column">
	       		</div>
			</div>
			<div class="profileSection" id="lowerSection">
				<div id="badges">
					Badges:<br>
					<div id="badgeSpace">Sorry, this user has no badges yet :'(</div>
				</div>
			</div>
		</div>
	</div>
</div>

</body>
</html>

