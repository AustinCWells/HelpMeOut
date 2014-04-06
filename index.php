<?php include "components/header.html" ?>
	<!--TABS: -->
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
	<script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
	<script language="javascript"  type="text/javascript" src="js/jobTabs.js"> </script>
	<script language="javascript"  type="text/javascript" src="js/index.js"> </script> 
	


</head>
<body class="blue">
	<!--<span class="currentPage" id="indexPage"></span>-->

<div class="row yellow">
	<div class="twelve columns">
		<p id="randomText">HELP IS COMING. SLOWLY. FEEL FREE TO TAKE A NAP.</p>
	</div>
</div>
<br>
<div class="row">
	<div class="eight columns">
		<div id="tabs">
			<ul>
				<!--This section introduces the tabs and titles them-->
				<li><a href="#tabs-1">Food</a></li>
				<li><a href="#tabs-2">Laundry</a></li>
				<li><a href="#tabs-3">Groceries</a></li>
				<li><a href="#tabs-4">Cleaning</a></li>
				<li><a href="#tabs-5">Rides</a></li>
				<li><a href="#tabs-6">Tech Support</a></li>
				<li><a href="#tabs-7">Maintenance</a></li>
				<li><a href="#tabs-8">Other</a></li>
			</ul>

			<!--This section creates the content within each tab-->
			<div id="tabs-1">
				<div class="postings" id="food"></div>
			</div>
			<div id="tabs-2">
				<div class="postings" id="laundry"></div>
			</div>
			<div id="tabs-3">
				<div class="postings" id="groceries"></div>
			</div>
			<div id="tabs-4">
				<div class="postings" id="cleaning"></div>
			</div>
			<div id="tabs-5">
				<div class="postings" id="rides"></div>
			</div>
			<div id="tabs-6">
				<div class="postings" id="techSupport"></div>
			</div>
			<div id="tabs-7">
				<div class="postings" id="maintenance"></div>
			</div>
			<div id="tabs-8">
				<div class="postings" id="other"></div>
			</div>

		</div>
	</div>

	<div class="four columns">
		<div id="recentBox">
			<div id="recentHeader">Recent Jobs:</div>
			<div id="recentJobs"></div>
		</div>
	</div>
</div>


</body>
</html>