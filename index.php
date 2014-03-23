<!DOCTYPE HTML>
<html>
<head>
	<title>HelpMeOut</title>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<!--<script src="js/jquery.cookie.js"></script>
	<script language="javascript"  type="text/javascript" src="js/nav.js"> </script> -->
	<link href="css/main.css" rel="stylesheet">
	<script language="javascript" type="text/javascript" src="js/index.js"> </script> 
	<script language="javascript"  type="text/javascript" src="js/modal.js"> </script>  
	<script language="javascript"  type="text/javascript" src="js/nav.js"> </script>  

	<!--TABS: -->
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
	<script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>


</head>
<body>
	<?php include "components/nav.html"; ?>
	<?php include "components/modals.html"; ?> 
 
	<p>WE WILL HELP YOU OUT. SOON.</p>


<div id="tabs">
	<ul>
		<!--This section introduces the tabs and titles them-->
		<li><a href="#tabs-1">Food Pickup & Delivery</a></li>
		<li><a href="#tabs-2">Laundry</a></li>
		<li><a href="#tabs-3">Groceries</a></li>
		<li><a href="#tabs-4">Transportation</a></li>
		<li><a href="#tabs-5">Rides</a></li>
	</ul>

	<!--This section creates the content within each tab-->
	<div id="tabs-1">
		<div class="postings" id="food">
			<!--example job posting
			<a href="http://facebook.com">
				<div class="jobPost" id="foodPosting0">
					<p class="jobTitle">I AM NOT HAUNGREH</p>
					<p class="jobPrice">ONE MILLION DOLLARS</p>
					<img class="jobImage" src="http://www.vectors4all.net/preview/closed-mailing-envelope-clip-art.jpg">
				</div>
			</a>
			-->
		</div>
	</div>
	<div id="tabs-2">
		<div class="postings" id="laundry">
		</div>
	</div>
	<div id="tabs-3">
		<div class="postings" id="groceries">
		</div>
	</div>
	<div id="tabs-4">
		<div class="postings" id="transportation">
		</div>
	</div>
	<div id="tabs-5">
		<div class="postings" id="rides">
		</div>
	</div>

</div>

<div id="recentJobs">
RECENT JOBS:<br>

JOBS<br>
JOBS<br>
JOBS<br>
JOBS<br>
<img src="http://s3.amazonaws.com/crunchbase_prod_assets/assets/images/resized/0001/0974/10974v7-max-250x250.jpg"><br>
JOBS<br>
JOBS<br>
JOBS<br>
</div>

</body>
</html>