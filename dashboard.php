<?php include "components/header.html" ?>


	<!-- ACCORDIAN STUFF -->
	<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
	<script src="//code.jquery.com/jquery-1.9.1.js"></script>
	<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

		<script language="javascript"  type="text/javascript" src="js/dashboard.js"> </script> 

</head>
<body>
	<?php include "components/nav.html"; ?>  
	<span class="currentPage" id="dashboardPage"></span>


	<p>WE WILL HAVE PLENTY OF JOBS FOR YOU TO ACCEPT. SOON.</p>

	<div class="dashboardSection" id="jobsImDoing">
		<p class="dashboardTitle">JOBS I'M DOING</p>
		<div id="accordionLeft">
			<h3>You have no jobs!</h3>
			<div><p>You're pretty lame, aren't you?</p></div>
		</div>
	</div>

	<div class="dashboardSection" id="jobsINeedDone">
		<p class="dashboardTitle">JOBS I NEED DONE</p>
		<div id="accordionRight">
			<h3>You have no jobs!</h3>
			<div><p>You're pretty lame, aren't you?</p></div>
		</div>
	</div>


</body>
</html>