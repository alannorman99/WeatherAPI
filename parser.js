//read through the city list json and find the city id of a designated city
const fetch = require("node-fetch");

fetch("JavaScript/Test Projects/Weather API Tester/data.json")
	.then(response => response.json())
	.then(data => {
		console.log(data);
	});
