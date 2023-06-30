$(document).ready(() => {

	var isDataFound = true;

	$("#search").keyup((e) => {

		// setting the default page
		$("#PageNo").text("1")

		//request for date
		$.ajax({
			url: "/Home/GetDate",
			type: "GET",
			data: {
				SearchString: e.target.value,
				pageNo: 1,
			},
			success: (data) => {

				// checking if the data is null or empty
				if (data.length == 0) {
					$("#fillHere").html('<tr ><td colspan="4"> Nothing to Show</td></tr>')
				}
				else {
					var html = ""
					$("#fillHere").text("");

					// Making the html 
					$.each(data, function (index, item) {

						var jsonDate = item.DOB;

						var microsoftJsonDate = jsonDate;
						var timestamp = parseInt(microsoftJsonDate.match(/\d+/)[0]);
						var date = new Date(timestamp);
						var year = date.getFullYear();
						var month = String(date.getMonth() + 1).padStart(2, '0');
						var day = String(date.getDate()).padStart(2, '0');
						var formattedDate = year + '-' + month + '-' + day;


						html += "<tr><td>" + item.Name + "</td><td>" + formattedDate + "</td><td>" + item.Age + "</td><td>" +
							"<a class='btn btn-warning btn-sm' href='/Home/Edit/" + item.Id + "'>Edit</a> | " + 
							"<a class='btn btn-success btn-sm' href='/Home/Details/" + item.Id + "'>Details</a> | " +
							"<a class='btn btn-danger btn-sm' href='/home/Delete/" + item.Id + "'>Delete</a>" 
							+ "</td></tr > "
					})
					// filling the html
					$("#fillHere").html(html);
				}
			},
			error: (e) => {
				console.log(e);
			}
		})
	})

	$("#Previous").on("click",() => {

		// declare the variable
		var page = 1;

		// setting the page no.
		if (parseInt($("#PageNo").text()) == 1) {
			page = 1;
			return;
		}
		else {
			page = parseInt($("#PageNo").text()) - 1;
		}


		// request for data
		$.ajax({
			url: "/Home/GetDate",
			type: "GET",
			data: {
				SearchString: $("#search").text(),
				pageNo: page,
			},

			success: (data) => {

				// checking the data if empty
				if (data.length == 0) {
					$("#fillHere").html('<tr ><td colspan="4"> Nothing to Show</td></tr>')
				}
				else {
					console.log("hehe")
					var html = ""
					$("#fillHere").text("");

					$.each(data, function (index, item) {

						var jsonDate = item.DOB;

						var microsoftJsonDate = jsonDate;
						var timestamp = parseInt(microsoftJsonDate.match(/\d+/)[0]);
						var date = new Date(timestamp);
						var year = date.getFullYear();
						var month = String(date.getMonth() + 1).padStart(2, '0');
						var day = String(date.getDate()).padStart(2, '0');
						var formattedDate = year + '-' + month + '-' + day;


						html += "<tr><td>" + item.Name + "</td><td>" + formattedDate + "</td><td>" + item.Age + "</td><td>" +
							"<a class='btn btn-warning btn-sm' href='/Home/Edit/" + item.Id + "'>Edit</a> | " +
							"<a class='btn btn-success btn-sm' href='/Home/Details/" + item.Id + "'>Details</a> | " +
							"<a class='btn btn-danger btn-sm' href='/home/Delete/" + item.Id + "'>Delete</a>"
							+ "</td></tr > "
					})

					$("#fillHere").html(html);
					isDataFound = true;
				}
				$("#PageNo").html((page).toString())
				console.log(isDataFound)

			},

			error: (e) => {
				console.log(e);
			}
		})
	})

	$("#Next").on("click", () => {
		

		var page = 1;
		page = parseInt($("#PageNo").text()) + 1;
		
		$.ajax({
			url: "/Home/GetDate",
			type: "GET",
			data: {
				SearchString: $("#search").text(),
				pageNo: page,
			},

			success: (data) => {

				if (data.length == 0) {
					$("#fillHere").html('<tr ><td colspan="4"> Nothing to Show</td></tr>')
					if (isDataFound) {
						$("#PageNo").text((page).toString())
						isDataFound = false;
					}

					return;
				}
				else {
					var html = ""
					$("#fillHere").text("");

					$.each(data, function (index, item) {

						var jsonDate = item.DOB;

						var microsoftJsonDate = jsonDate;
						var timestamp = parseInt(microsoftJsonDate.match(/\d+/)[0]);
						var date = new Date(timestamp);
						var year = date.getFullYear();
						var month = String(date.getMonth() + 1).padStart(2, '0');
						var day = String(date.getDate()).padStart(2, '0');
						var formattedDate = year + '-' + month + '-' + day;


						html += "<tr><td>" + item.Name + "</td><td>" + formattedDate + "</td><td>" + item.Age + "</td><td>" +
							"<a class='btn btn-warning btn-sm' href='/Home/Edit/" + item.Id + "'>Edit</a> | " +
							"<a class='btn btn-success btn-sm' href='/Home/Details/" + item.Id + "'>Details</a> | " +
							"<a class='btn btn-danger btn-sm' href='/home/Delete/" + item.Id + "'>Delete</a>"
							+ "</td></tr > "
					})

					$("#fillHere").html(html);
					isDataFound = true;
					$("#PageNo").text((page).toString())

				}
				console.log(isDataFound)
			},

			error: (e) => {
				console.log(e);
			}
		})
	})





});