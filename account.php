	<?php include "components/header.html" ?>
	<script language="javascript"  type="text/javascript" src="js/account.js"> </script>  
</head>
<body>
	<?php include "components/nav.html"; ?> 
	<?php include "components/modals.html"; ?> 

	<p>WE HAVE AWARDED YOU BADGES. SOON OUR PLANS WILL COME TO FRUITION.</p>
	<div id="profile">
		<div class="profileSection" id="upperSection">
			<img src="" id="profilePic">
			<div id="contactInfo">
			</div>
			<div id="ratingDiv">
				Overall Rating:<br><br>
				<span id="ratingLabel">2%</span>
	            <div class="barArea">
		            <div id="ratingBg" ></div>
		            <div id="ratingFg"></div>
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


</body>
</html>

