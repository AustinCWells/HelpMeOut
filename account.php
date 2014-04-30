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
				<div class = "five column">
					<div class = "six column ratingDiv center">Overall Rating:
						<div class="row">
							<span class="ratingLabel two column">
							</span>
				            <div class="barArea">
					            <div class="ratingBg"></div>
					            <div class="ratingFg"></div>
					        </div>
					    </div>
		       		</div>
					<div class = "six column ratingDiv center">Speed Rating:
						<div class="row">
							<span class="ratingLabel two column">
							</span>
				            <div class="barArea">
					            <div class="ratingBg"></div>
					            <div class="ratingFg"></div>
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

