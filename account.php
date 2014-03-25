	<?php include "components/header.html" ?>
	<script language="javascript"  type="text/javascript" src="js/account.js"> </script> 
	<script language="javascript"  type="text/javascript" src="js/rating.js"> </script> 
</head>
<body class="blue">
	<?php include "components/nav.html"; ?> 
	<!--<span class="currentPage" id="accountPage"></span>-->

<div class="row yellow">
	<div class="twelve columns">
		<p>WHO WANT'S THIS DOGE?</p>	
	</div>
</div>
<br>

<div class="row">
	<div class="twelve columns">
		<div id="profile">
			<div class="profileSection" id="upperSection">
				<img src="" id="profilePic">
				<div id="contactInfo">
				</div>
				<div class="ratingDiv">Overall Rating:<br><br>
					<span class="ratingLabel"></span>
		            <div class="barArea">
			            <div class="ratingBg" ></div>
			            <div class="ratingFg"></div>
			        </div>
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

