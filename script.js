//my openweathermap api key
var api_key = '43f65832e26378bb84803701f1a2370b'

//function to get weather date based on a specific city (cityLocation) and the type of unit you want used (metric, imperial, etc.)
function getWeatherByCityLocation(cityLocation, unit) {
	//fetch call to openweather api using the url provided
	fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityLocation + '&units=' + unit + '&APPID=' + api_key)
		.then(function (response) { return response.json() })
		.then(function (data) {
			displayWeather(data);
			console.log(data);
		})
		.catch(function () {
			console.log("error");
		});
}

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
	var description = data.weather[0].description;

	//assign elements to data in the object(data)
	document.getElementById('description').innerHTML = description;
	document.getElementById('temp').innerHTML = data.main.temp + '&deg;';
	document.getElementById('location').innerHTML = data.name;
	//document.getElementById('visibility').innerHTML = data.visibility;

	//assign a background color in css based on the description of the weather from the api
	if (description.indexOf('rain') > 0) {
		document.body.className = 'rainy';
	} else if (description.indexOf('cloud') > 0) {
		document.body.className = 'cloudy';
	} else if (description.indexOf('sunny') > 0) {
		document.body.className = 'sunny';
	}
}

//creates reference to button
var button = document.getElementById('submitBtn');

//detects button click and executes function
button.onclick = function () {
	getWeatherByCityLocation('Miami', 'imperial');
}

//executes everytime the window loads/reloads
window.onload = function () {

	//getWeatherByCityLocation('London', 'imperial');
	getWeatherByCityId(3110016, 'imperial');

	//getWeatherByCityLocation('Miami', 'imperial');
	//getWeatherByCityLocation('New York', 'imperial');
}