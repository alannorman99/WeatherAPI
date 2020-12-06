
const cityName = document.querySelector('.city-form');
const forecastDiv = document.querySelector('.forecast');
const forecastHeader = document.getElementById('days-header');
//my openweathermap api key
var api_key = '6b64a0d71c29041c27e6218c1cc37154';

const days = {
	0: 'Sunday',
	1: 'Monday',
	2: 'Tuesday',
	3: 'Wednesday',
	4: 'Thursday',
	5: 'Friday',
	6: 'Saturday'
}



//var cities = [Bangkok, Paris, London, Dubai, Singapore, Kuala Lumpur, New York City, Istanbul, Tokyo, Antalya];

function getForecastByCityLocation(cityLocation, unit) {
	//fetch call to openweather api using the url provided
	fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityLocation + '&units=' + unit + '&APPID=' + api_key)
		//.then means to continue with the data from fetch and put it through a function that returns the response as json(javascript object notation)
		.then(function (response) { return response.json() })
		//that json comes as (data) and we run it though our displayWeather function and log it to console
		.then(function (data) {
			fillForecastTemps(data);
			console.log(data);
		})
		//this catches any errors from the fetch so nothing crashes
		.catch(function (error) {
			console.error(error);
		});
}


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
	return cityName && cityName.toString().trim() != '';

}

function fillForecastDays() {

	var date = new Date();
	var day = date.getDay();

	count = 5;
	dayCount = 1;

	while (count > 0) {
		day++;
		if (day > 6) {
			day = 0;
		}

		document.getElementById('day' + dayCount + '-table').innerHTML = days[day];

		dayCount++;
		count--;
	}
}

function fillForecastTemps(data) {

	var temps = [];
	let counter = 1;
	let sum = 0;

	for (item in data.list) {
		if (counter === 8) {
			temps.push(sum);
			sum = 0;
			counter = 0;
		}
		sum = sum + data.list[item].main.temp;

		console.log(sum);


		counter++;
	}

	tempCount = 1;

	temps.forEach(temp => {
		document.getElementById('temp' + tempCount + "-table").innerHTML = Math.round(temp / 8, 0);
		tempCount++;
	});

	console.log(temps);

}

//executes everytime the window loads/reloads
window.onload = function () {

	fillForecastDays();
	getForecastByCityLocation("Miami", 'imperial')

	cityName.addEventListener('submit', (event) => {
		event.preventDefault();
		const data = new FormData(cityName);
		const name = data.get('city-name');

		if (validateCityNameString(name)) {
			getWeatherByCityLocation(name, "imperial");
		}

		getForecastByCityLocation(name, 'imperial')

	});

	//Test calles for the city location fetch
	getWeatherByCityLocation('Miami', 'imperial');

}	