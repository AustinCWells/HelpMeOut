	<?php include "components/header.html" ?>
	<script language="javascript"  type="text/javascript" src="js/settings.js"> </script> 
</head>
<body class="blue">
	<!--<span class="currentPage" id="accountPage"></span>-->

<div class="row yellow">
	<div class="twelve columns">
		<p>CHANGE IS GOOD!</p>	
	</div>
</div>
<br>

<div class="row">
	<div class="three columns"></div>
	<div class="six columns">
		<div id="settings">
			<form action="account.php">
				<div class="row">
					<div class="settingLabel five column">First Name:</div>
					<input id="firstName" class="setting five column">
				</div>
				<div class="row">
					<div class="settingLabel five column">Last Name:</div>
					<input id="lastName" class="setting five column">
				</div>
				<div class="row">
					<div class="settingLabel five column">Phone #:</div>
					<input id="phoneNum" class="setting five column">
				</div>
				<div class="row">
					<div class="settingLabel five column">New Password:</div>
					<input type="password" id="newPassword" class="setting five column">
				</div>
				<div class="row">
					<div class="settingLabel five column">Confirm Password:</div>
					<input type="password" id="confirmPassword" class="setting five column">
				</div>
				<input type="submit" value="Save Changes"><!--Does nothing-->
			</form>
			<br>
			<br>
			<form enctype="multipart/form-data" action="uploader.php" method="POST">
				<input type="hidden" name="MAX_FILE_SIZE" value="100000" />
				Upload New Profile Pic: <br><input name="uploadedfile" type="file" /><br /><br>
				<input type="submit" value="Upload File" />
			</form>
		</div>
	</div>
	<div class="three columns"></div>
</div>

</body>
</html>

