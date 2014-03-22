<!DOCTYPE HTML>
<html>
<head>
	<title>HelpMeOut</title>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="js/jquery.cookie.js"></script>
	<!--<script language="javascript" type="text/javascript" src="js/index.js"> </script> 
	<script language="javascript"  type="text/javascript" src="js/modal.js"> </script>  
	<script language="javascript"  type="text/javascript" src="js/nav.js"> </script> -->
	<link href="css/main.css" rel="stylesheet">
	<script language="javascript"  type="text/javascript" src="js/account.js"> </script>  

</head>
<body>
	<?php include "components/nav.html"; ?> 
	<p>WE WILL AWARD YOU SHINY NEW BADGES. SOON.</p>
	<div id="profile">
		<div class="profileSection" id="upperSection">
			<img src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash3/t1.0-1/p200x200/1606987_10152195066022415_1956973447_n.jpg" id="profilePic">
			<div id="contactInfo">
				Name: Jordan Silver<br>
				Phone: you can't have it<br>
				Email: jcsilver@smu.edu<br>
				Location: Table 24
			</div>
		</div>
		<div class="profileSection" id="lowerSection">
			<div id="badges">
				Badges:<br>
				YOU'RE AWESOME: you actually noticed this! good job!<br>
				<div id="progressDiv">
					<span id="progressLable">55%</span>
		            <div class="progressBar">
			            <div id="ratingBg" ></div>
			            <div id="ratingFg" progress="55"></div>
			        </div>
	       		</div>
			</div>
		</div>
	</div>


</body>
</html>