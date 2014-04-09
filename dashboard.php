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
		<p>DON'T BE CONFUSED. THESE JOBS ARE MERELY AN ILLUSION.</p>
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
			<div id="accordionRight">
				<!--<h3>You have no jobs!</h3>
				<div><p>You're pretty lame, aren't you?</p></div>-->
				<h3>Help for: '*short_description*'</h3>
				<div>
					<div class = "row redOutline">
						<img class="jobPic three columns redOutline" src="img/food.png">
						<div class="jobContactInfo seven columns redOutline">
							Name: *first_name* *last_name*<br>
							Phone: *phone_number*<br>
							Email: *email_address*<br>
							Location: *location*<br><br>
							<span class="smallText">Start Time:</span> *start_time* <span class="smallText">End Time:</span> *end_time*
						</div>
						<div class = "seperator"></div>
						<div class="three columns redOutline">
							<div class="smallText">*beggar_name* has offered you:</div><br>
							<div class="jobDashPrice left">$5</div>
						</div>
					</div>
					<div class = "row redOutline">
						<div class="jobNotes twelve columns">
							<p class="notesHeader">Notes:</p>
							*notes* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae quam in ligula iaculis tristique vel vitae tellus. Nullam semper condimentum mauris. Donec in mi nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum gravida odio a bibendum semper. Etiam cursus velit sit amet nisi adipiscing commodo. Quisque nec tortor ac nunc aliquet dictum eu vitae metus.
							In quis tincidunt ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae quam in ligula iaculis tristique vel vitae tellus. Nullam semper condimentum mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae quam in ligula iaculis tristique vel vitae tellus. Nullam semper condimentum mauris. *notes*
						</div>
					</div>
					<div class = "row redOutline center">
						<input type="button" class="cancelJob five columns" value="Cancel Job">
						<input type="button" class="jobCompleted five columns" value="Job Completed">
					</div>
				</div>
					<!--<div class="jobMap">**Map not implemented**</div>-->

				<h3>*chooser_name* has offered Help!</h3>
				<div>
					<div class = "row redOutline">
							<span class = "bidHeader twelve column center">*chooser_name* has requested to complete your job: '*short_description*'</span>
					</div>
					<div class = "row redOutline">
						<img class="jobPic three columns redOutline" src="img/food.png">
						<div class="jobContactInfo seven columns redOutline">
							Name: *first_name* *last_name*<br><br>
							<span class="smallText">Start Time:</span> *start_time* <span class="smallText">End Time:</span> *end_time*
						</div>
						<div class = "seperator"></div>
						<div class="three columns redOutline">
							<div class="smallText">*beggar_name* has offered you:</div><br>
							<div class="jobDashPrice left">$5</div>
						</div>
					</div>
					<div class = "row redOutline">
							<!--rating-->
							<div class="row">
								<div class = "six column ratingDiv center">Overall Rating:
									<div class="row">
										<span class="ratingLabel two column">
										</span>
							            <div class="barArea">
								            <div class="ratingBg"></div>
								            <div class="ratingFg"></div>
								        </div>
								    </div>
					       		</div>
								<div class = "six column ratingDiv center">Speed Rating:
									<div class="row">
										<span class="ratingLabel two column">
										</span>
							            <div class="barArea">
								            <div class="ratingBg"></div>
								            <div class="ratingFg"></div>
								        </div>
								    </div>
					       		</div>
							</div>
					</div>
					<div class = "row redOutline center">
						<input type="button" class="accept five columns" value="Accept">
						<input type="button" class="decline five columns" value="Decline">
					</div>
			</div>
		</div>
	</div>
</div>


</body>
</html>

<!--<h3>You have no jobs!</h3>
				<div><p>You're pretty lame, aren't you?</p></div>-->
				<!--
				<h3>*beggar_id*: '*short_description*'</h3>
				<div>
					<div class = "row redOutline">
						<img class="jobPic three columns redOutline" src="img/food.png">
						<div class="jobContactInfo seven columns redOutline">
							Name: *first_name* *last_name*<br>
							Phone: *phone_number*<br>
							Email: *email_address*<br>
							Location: *location*<br><br>
							<span class="smallText">Start Time:</span> *start_time* <span class="smallText">End Time:</span> *end_time*
						</div>
						<div class = "seperator"></div>
						<div class="three columns redOutline">
							<div class="smallText">*beggar_name* has offered you:</div><br>
							<div class="jobDashPrice left">$5</div>
						</div>
					</div>
					<div class = "row redOutline">
						<div class="jobNotes twelve columns">
							<p class="notesHeader">Notes:</p>
							*notes* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae quam in ligula iaculis tristique vel vitae tellus. Nullam semper condimentum mauris. Donec in mi nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum gravida odio a bibendum semper. Etiam cursus velit sit amet nisi adipiscing commodo. Quisque nec tortor ac nunc aliquet dictum eu vitae metus.
							In quis tincidunt ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae quam in ligula iaculis tristique vel vitae tellus. Nullam semper condimentum mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae quam in ligula iaculis tristique vel vitae tellus. Nullam semper condimentum mauris. *notes*
						</div>
					</div>
					<div class = "row redOutline center">
						<input type="button" class="cancelJob five columns" value="Cancel Job">
						<input type="button" class="jobCompleted five columns" value="Job Completed">
					</div>
				
				</div>

				<h3>Help offered to *beggar_name*</h3>
				<div>
					<div class = "row redOutline">
							<span class = "bidHeader twelve column center">You have requested to complete *beggar_name*'s job: '*short_description*'</span>
					</div>
					<div class = "row redOutline">
						<img class="jobPic three columns redOutline" src="img/food.png">
						<div class="jobContactInfo seven columns redOutline">
							Name: *first_name* *last_name*<br><br>
							<span class="smallText">Start Time:</span> *start_time* <span class="smallText">End Time:</span> *end_time*
						</div>
						<div class = "seperator"></div>
						<div class="three columns redOutline">
							<div class="smallText">*beggar_name* has offered you:</div><br>
							<div class="jobDashPrice left">$5</div>
						</div>
					</div>
					<div class = "row redOutline">
						<div class="jobNotes twelve columns">
							<p class="notesHeader">Notes:</p>
							*notes* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae quam in ligula iaculis tristique vel vitae tellus. Nullam semper condimentum mauris. Donec in mi nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum gravida odio a bibendum semper. Etiam cursus velit sit amet nisi adipiscing commodo. Quisque nec tortor ac nunc aliquet dictum eu vitae metus.
							In quis tincidunt ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae quam in ligula iaculis tristique vel vitae tellus. Nullam semper condimentum mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae quam in ligula iaculis tristique vel vitae tellus. Nullam semper condimentum mauris. *notes*
						</div>
					</div>
					<div class = "row redOutline center">
						<input type="button" class="cancel center" value="Cancel Request">
					</div>
				</div>
				-->
