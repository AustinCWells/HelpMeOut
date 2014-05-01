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
					<div class = "six column ratingDiv center">Overall Rating:
						<div class="row">
							<!-- <span class="ratingLabel two column">
							</span> -->
				            <!-- <div class="barArea">
					            <div class="ratingBg"></div>
					            <div class="ratingFg"></div>
					        </div> -->
					        <div class="starRating">
								<div>
							    	<div>
							      		<div>
							        		<div>
							          			<input id="overallRating1" type="radio" name="overallRating" value="1" disabled="true">
							       			  	<label for="overallRating1"><span>1</span></label>
								    			</div>
								    		    <input id="overallRating2" type="radio" name="overallRating" value="2" disabled="true">
								   		     	<label for="overallRating2"><span>2</span></label>
								   		   	</div>
								  		   	<input id="overallRating3" type="radio" name="overallRating" value="3" disabled="true">
										    <label for="overallRating3"><span>3</span></label>
									    </div>
									    <input id="overallRating4" type="radio" name="overallRating" value="4" disabled="true">
									    <label for="overallRating4"><span>4</span></label>
								  	</div>
								<input id="overallRating5" type="radio" name="overallRating" value="5" disabled="true">
								<label for="overallRating5"><span>5</span></label>
							</div>
					    </div>
		       		</div>
					<div class = "six column ratingDiv center">Speed Rating:
						<div class="row">
							<!-- <span class="ratingLabel two column">
							</span>
				            <div class="barArea">
					            <div class="ratingBg"></div>
					            <div class="ratingFg"></div>
					        </div> -->
					        <div class="starRating">
								<div>
							    	<div>
							      		<div>
							        		<div>
							          			<input id="speedRating1" type="radio" name="speedRating" value="1" disabled="true">
							       			  	<label for="speedRating1"><span>1</span></label>
								    			</div>
								    		    <input id="speedRating2" type="radio" name="speedRating" value="2" disabled="true">
								   		     	<label for="speedRating2"><span>2</span></label>
								   		   	</div>
								  		   	<input id="speedRating3" type="radio" name="speedRating" value="3" disabled="true">
										    <label for="speedRating3"><span>3</span></label>
									    </div>
									    <input id="speedRating4" type="radio" name="speedRating" value="4" disabled="true">
									    <label for="speedRating4"><span>4</span></label>
								  	</div>
								<input id="speedRating5" type="radio" name="speedRating" value="5" disabled="true">
								<label for="speedRating5"><span>5</span></label>
							</div>
					    </div>
		       		</div>
	       		</div>
	       		<div class = "two column">
	       			<!-- <input type="button" class="editProfile" value="Edit Profile"> -->
	       			<!-- <a href="settings.php">Settings</a> -->
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

