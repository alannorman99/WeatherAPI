
//my openweathermap api key
var api_key = '';

//var cities = [Bangkok, Paris, London, Dubai, Singapore, Kuala Lumpur, New York City, Istanbul, Tokyo, Antalya];


//function to get weather date based on a specific city (cityLocation) and the type of unit you want used (metric, imperial, etc.)
function getWeatherByCityLocation(cityLocation, unit) {
	//fetch call to openweather api using the url provided
	fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityLocation + '&units=' + unit + '&APPID=' + api_key)
		//.then means to continue with the data from fetch and put it through a function that returns the response as json(javascript object notation)
		.then(function (response) { return response.json() })
		//that json comes as (data) and we run it though our displayWeather function and log it to console
		.then(function (data) {
			displayWeather(data);
			console.log(data);
		})
		//this catches any errors from the fetch so nothing crashes
		.catch(function () {
			console.log("error");
		});
}

//function to get weather date based on a specific city (id) and the type of unit you want used (metric, imperial, etc.)
function getWeatherByCityId(cityId, unit) {
	//fetch call to openweather api using the url provided
	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&units=' + unit + '&APPID=' + api_key)
		.then(function (response) { return response.json() })
		.then(function (data) {
			displayWeather(data);
			console.log(data);
		})
		.catch(function () {
			console.log("error");
		});

}

//assigns the html tags to specific data from the json object and displays it in the browser
function displayWeather(data) {

	//holds the description of the current weather
	//we know it has a description based on the console log of the data we inspected from the fetch
	var description = data.weather[0].description;

	//assign elements to data in the object(data)
	//html contains tags with ids thus we get the element by its id and assign it something
	document.getElementById('description').innerHTML = description;
	document.getElementById('temp').innerHTML = data.main.temp + '&deg;';
	document.getElementById('location').innerHTML = data.name;

	//document.getElementById('visibility').innerHTML = data.visibility; (test)

	//assign a background color in css based on the description of the weather from the api
	//if the value in description is equal to that word then it will be greater than 0 else it will never be
	if (description.indexOf('rain') > 0) {
		/*document gets the webpage html then it directs to the body tag then sets its 
		className parameter to rainy which connects to the css*/
		document.body.className = 'rainy';
	} else if (description.indexOf('cloud') > 0) {
		document.body.className = 'cloudy';
	} else if (description.indexOf('sunny') > 0) {
		document.body.className = 'sunny';
	} else if (data.description === 'broken clouds') {
		document.body.className = 'broken';
	}
}

//validate whether or not the city name inputed by the user is a string (test function ignore)
function validateCityNameString(cityName) {
	if (isNaN(cityName) && !cityName.includes("'") && !cityName.includes('"')) {
		console.log("It is a string");
	} else {
		console.log("It isn't a string");
	}
}

//creates reference to button on webpage
var button = document.getElementById('submitBtn');

//detects button click and executes function
button.onclick = function () {

	//gets the user input on button click and validate it (test function ignore)
	var text_field = document.getElementById("cityName").value;
	validateCityNameString(text_field);
	console.log(text_field);
}

//executes everytime the window loads/reloads
window.onload = function () {

	//runs 
	//getWeatherByCityId(3110016, 'imperial');

	//Test calles for the city location fetch
	getWeatherByCityLocation('Miami', 'imperial');

	//waits 5 seconds then changes the weather on the webpage from miami to new york
	window.setTimeout(function () {
		getWeatherByCityLocation('New York', 'imperial');

	}, 5000);
}	