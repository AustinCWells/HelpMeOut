<!DOCTYPE HTML>
<html>
<head>
	<title>HelpMeOut</title>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<!--<script language="javascript" type="text/javascript" src="js/index.js"> </script> 
	<script src="js/jquery.cookie.js"></script> 
	<script language="javascript"  type="text/javascript" src="js/nav.js"> </script> -->
	<link href="css/main.css" rel="stylesheet">
	<script language="javascript"  type="text/javascript" src="js/modal.js"> </script> 
	<script language="javascript"  type="text/javascript" src="js/dashboard.js"> </script> 
	<script language="javascript"  type="text/javascript" src="js/nav.js"> </script>



	<!-- ACCORDIAN STUFF -->
	<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
	<script src="//code.jquery.com/jquery-1.9.1.js"></script>
	<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

</head>
<body>
	<?php include "components/nav.html"; ?> 
	<?php include "components/modals.html"; ?> 

	<p>WE WILL HAVE PLENTY OF JOBS FOR YOU TO ACCEPT. SOON.</p>

	<div class="dashboardSection" id="jobsImDoing">
		<div id="accordionLeft">
			<h3>You have no jobs!</h3>
			<div><p>You're pretty lame, aren't you?</p></div>
		</div>
	</div>

	<div class="dashboardSection" id="jobsINeedDone">
		<div id="accordionRight">
			<h3>You have no jobs!</h3>
			<div><p>You're pretty lame, aren't you?</p></div>
		</div>
	</div>


</body>
</html>