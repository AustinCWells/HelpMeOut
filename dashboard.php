<?php include "components/header.html" ?>


	<!-- ACCORDIAN STUFF -->
	<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
	<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

		<script language="javascript"  type="text/javascript" src="js/dashboard.js"> </script> 
		<script language="javascript"  type="text/javascript" src="js/rating.js"> </script>

</head>
<body class="blue">
	

<div class="row yellow">
	<div class="twelve columns">
		<p>THIS IS YOUR HELPDESK. ITS OPEN 24/7.</p>
	</div>
</div>
<br>

<div class="row">
	<div class="six columns">
		<div class="dashboardSection" id="jobsImDoing">
			<p class="dashboardTitle">JOBS I'M DOING</p>
			<div id="accordionLeft"></div>
		</div>
	</div>
	<div class="six columns">
		<div class="dashboardSection" id="jobsINeedDone">
			<p class="dashboardTitle">HELP I'M GETTING</p>
			<div id="accordionRight"></div>
		</div>
	</div>
</div>


</body>
</html>