<?php include "components/header.html" ?>
	<!--TABS: -->
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
	<script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
	<script language="javascript"  type="text/javascript" src="js/jobTabs.js"> </script>
	<script language="javascript"  type="text/javascript" src="js/formSubmit.js"> </script>   


</head>
<body>
	<?php include "components/nav.html"; ?>
	<span class="currentPage" id="indexPage"></span>



	<p>WE WILL HELP YOU OUT. SOON.</p>


<div id="tabs">
	<ul>
		<!--This section introduces the tabs and titles them-->
		<li><a href="#tabs-1">Food Pickup & Delivery</a></li>
		<li><a href="#tabs-2">Laundry</a></li>
		<li><a href="#tabs-3">Groceries</a></li>
		<li><a href="#tabs-4">Tutoring</a></li>
		<li><a href="#tabs-5">Rides</a></li>
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
		<div class="postings" id="tutoring"></div>
	</div>
	<div id="tabs-5">
		<div class="postings" id="rides"></div>
	</div>

</div>

<div id="recentJobs"></div>

</body>
</html>