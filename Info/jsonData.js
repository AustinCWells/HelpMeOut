Sign Up


	Send to Server


		Object {
			firstName: "Chris", 
			lastName: "Dunn",
			number: "95483019111", 
			email: "whatsup@smu.edu", 
			gender: 0,
			birthDate: "1992-08-19",
			password: "password"
		}

	Receive from server


		Object {
			userID: 13, 
			firstName: "Chris", 
			lastName: "Dunn", 
			email: "whatsup@smu.edu", 
			tokens: "10"
		} 


Login

	Send to Server


		Object {
			email: "whatsup@smu.edu", 
			password: "password"
		} 

	Receive from server


		Object {
			userID: 13, 
			firstName: "Chris", 
			lastName: "Dunn", 
			email: "whatsup@smu.edu", 
			tokens: "10"
		} 


Post Job

	Send to Server

		Object {
			userID: 13, 
			category: 0, 
			description: "Burger", 
			price: 2, 
			location: "Fondy",
			deadlineTime: "14:47",
			deadlineDate: "2014-04-11",
			notes: "Double Double With Fries"
		}


	Receive from server

		Nothing as of now

