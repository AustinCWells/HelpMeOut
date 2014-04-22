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
			<form action="api/updateaccount" method="POST" id="updateAccountForm">
				<div class="row">
					<div class="settingLabel five column">First Name:</div>
					<input id="firstName" class="setting five column" maxlength = "40">
				</div>
				<div class="row">
					<div class="settingLabel five column">Last Name:</div>
					<input id="lastName" class="setting five column" maxlength = "40">
				</div>
				<div class="row">
					<div class="settingLabel five column">Phone #:</div>
					<input id="phoneNum" class="setting five column" maxlength = "12">
				</div>
				<div class="row">
					<div class="settingLabel five column">Email:</div>
					<input id="email" class="setting five column" maxlength = "100">
				</div>
				<input type="submit" value="Save Changes"><!--Does nothing-->
			</form>
			<br>
			<br>
			<form enctype="multipart/form-data" action="api/changeProfileImage" method="GET" id="updatePicForm">
				<input type="hidden" name="MAX_FILE_SIZE" value="100000"/>
				Upload New Profile Pic: <br><input name="uploadedfile" type="file" id="uploadedFile" /><br /><br>
				<input type="submit" value="Upload File" />
			</form>
			<br>
			<br>
			<form action="api/updatepassword" method="POST" id="updatePasswordForm">
				<div class="row">
					<div class="settingLabel five column">New Password:</div>
					<input type="password" id="newPassword" class="setting five column" maxlength = "32">
				</div>
				<div class="row">
					<div class="settingLabel five column">Confirm Password:</div>
					<input type="password" id="confirmPassword" class="setting five column" maxlength = "32">
				</div>
				<input type="submit" value="Save Changes"><!--Does nothing-->
			</form>
		</div>
	</div>
	<div class="three columns"></div>
</div>

</body>
</html>

