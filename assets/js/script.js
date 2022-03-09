// variables
let searchFormEl = document.querySelector('#city-form');
let citySearchEl = document.querySelector('#cityName');
let searchButtonEl = document.querySelector('#searchButton');
const searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
let savedLocationEl = document.querySelector('#savedLocations');
// weather box
let cityNameEl = document.querySelector('#cityIcon');
let currentTempEl = document.querySelector('#currentTemp');
let currentWindEl = document.querySelector('#currentWind');
let currentHumidityEl = document.querySelector('#currentHumidity');
let currentUVEl = document.querySelector('#currentUV');
let currentImage = document.querySelector('#currentIcon');

// forecast
let forecastDate_1 = document.querySelector('#titleDay-1');
let forecastTemp_1 = document.querySelector('#tempDay-1');
let forecastWind_1 = document.querySelector('#windDay-1');
let forecastHumidity_1 = document.querySelector('#humidityDay-1');

let forecastDate_2 = document.querySelector('#titleDay-2');
let forecastTemp_2 = document.querySelector('#tempDay-2');
let forecastWind_2 = document.querySelector('#windDay-2');
let forecastHumidity_2 = document.querySelector('#humidityDay-2');

let forecastDate_3 = document.querySelector('#titleDay-3');
let forecastTemp_3 = document.querySelector('#tempDay-3');
let forecastWind_3 = document.querySelector('#windDay-3');
let forecastHumidity_3 = document.querySelector('#humidityDay-3');

let forecastDate_4 = document.querySelector('#titleDay-4');
let forecastTemp_4 = document.querySelector('#tempDay-4');
let forecastWind_4 = document.querySelector('#windDay-4');
let forecastHumidity_4 = document.querySelector('#humidityDay-4');

let forecastDate_5 = document.querySelector('#titleDay-5');
let forecastTemp_5 = document.querySelector('#tempDay-5');
let forecastWind_5 = document.querySelector('#windDay-5');
let forecastHumidity_5 = document.querySelector('#humidityDay-5');

let forecastImage_1 = document.querySelector('#forecast-image-1');
let forecastImage_2 = document.querySelector('#forecast-image-2');
let forecastImage_3 = document.querySelector('#forecast-image-3');
let forecastImage_4 = document.querySelector('#forecast-image-4');
let forecastImage_5 = document.querySelector('#forecast-image-5');


//API 
let apiKey = "807260d60be85ac5c384c80bba453072";
let city = "orlando";

//Trackers for only displaying saved searches at correct times
let savedRun = "";
let previousCity = "";

// Event Listener
searchButtonEl.addEventListener("click", function() {
    event.preventDefault();

    console.log(citySearchEl.value)
    if (citySearchEl.value === "" || citySearchEl.value === " " || citySearchEl.value === null)  {
    } else {
        city = citySearchEl.value;
        getCurrentWeather();
        saveCity(city[0].toUpperCase() + city.slice(1));
        citySearchEl.value = "";
    }
});

$(document).on("click", ".saved", function() {
    let text = $(this)
        .text()
        .trim();
   city = text;
   previousCity = "yes";
   getCurrentWeather();
});

// Functions
let getCurrentWeather = function() {
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    fetch(apiURL).then(function(response) {
        response.json().then(function(data) {
            displayCurrentWeather(data);
        });
    });
    
    populatePastSearches();
    savedRun = "yes";
}

function displayCurrentWeather(cityInfo) {
    //temp
    let currentTemp = cityInfo.main.temp;
    currentTempEl.textContent = "Temp: " + currentTemp  + " \xB0 F";

    //date
    let currentDate = dateConvert(cityInfo.dt);

    //current condition
    let currentConditionIcon = cityInfo['weather'][0]['icon'];
  
    //humidity
    let humidity = cityInfo.main.humidity;
    currentHumidityEl.textContent = "Humidity: " + humidity + " %";

    //wind speed
    let windSpeed = cityInfo.wind.speed;
    currentWindEl.textContent = "Wind: " + windSpeed + " MPH";

    //city name
    cityNameEl.textContent = city[0].toUpperCase() + city.slice(1) + " (" + currentDate + ")";

    currentImage.src = "http://www.openweathermap.org/img/wn/" + currentConditionIcon + "@2x.png";

    //get lat and long to get uvindex
    let cityLat = cityInfo.coord.lat;
    let cityLong = cityInfo.coord.lon;

    displayUVforecast(cityLat, cityLong)
}

function displayUVforecast(lat, long) {
     uvforecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +  "&lon=" + long+ "&exclude={part}&appid=" + apiKey + "&units=imperial";

    fetch(uvforecastURL).then(function(response) {
        response.json().then(function(uvforecastData) {
            //uv index
            let uvIndex = uvforecastData.current.uvi;
            if (uvIndex >= 3) {
                currentUVEl.style.backgroundColor = "#FFFF00";
            }
            if (uvIndex >= 6) {
                currentUVEl.style.backgroundColor = "#AA0000";
            } 
            currentUVEl.textContent =  uvIndex;
            displayforecast(uvforecastData);
        });
    });
}

function displayforecast(cityforecast) {

    //temp
    forecastTemp_1.textContent = "Temp: " + cityforecast.daily[0].temp.day + " \xB0 F"; 
    forecastTemp_2.textContent = "Temp: " + cityforecast.daily[1].temp.day + " \xB0 F"; 
    forecastTemp_3.textContent = "Temp: " + cityforecast.daily[2].temp.day + " \xB0 F"; 
    forecastTemp_4.textContent = "Temp: " + cityforecast.daily[3].temp.day + " \xB0 F"; 
    forecastTemp_5.textContent = "Temp: " + cityforecast.daily[4].temp.day + " \xB0 F"; 

    //date
    let currentDate_1 = dateConvert(cityforecast.daily[0].dt);
    let currentDate_2 = dateConvert(cityforecast.daily[1].dt);
    let currentDate_3 = dateConvert(cityforecast.daily[2].dt);
    let currentDate_4 = dateConvert(cityforecast.daily[3].dt);
    let currentDate_5 = dateConvert(cityforecast.daily[4].dt);
    
    forecastDate_1.textContent = currentDate_1;
    forecastDate_2.textContent = currentDate_2;
    forecastDate_3.textContent = currentDate_3;
    forecastDate_4.textContent = currentDate_4;
    forecastDate_5.textContent = currentDate_5;

    //icon
    let icon_1 = cityforecast.daily[0].weather[0].icon;
    let icon_2 = cityforecast.daily[1].weather[0].icon;
    let icon_3 = cityforecast.daily[2].weather[0].icon;
    let icon_4 = cityforecast.daily[3].weather[0].icon;
    let icon_5 = cityforecast.daily[4].weather[0].icon;

    forecastImage_1.src = "http://www.openweathermap.org/img/wn/" + icon_1 + "@2x.png";
    forecastImage_2.src = "http://www.openweathermap.org/img/wn/" + icon_2 + "@2x.png";
    forecastImage_3.src = "http://www.openweathermap.org/img/wn/" + icon_3 + "@2x.png";
    forecastImage_4.src = "http://www.openweathermap.org/img/wn/" + icon_4 + "@2x.png";
    forecastImage_5.src = "http://www.openweathermap.org/img/wn/" + icon_5 + "@2x.png";

    //wind
    forecastWind_1.textContent = "Wind: " + cityforecast.daily[0].wind_speed + "MPH";
    forecastWind_2.textContent = "Wind: " + cityforecast.daily[1].wind_speed + "MPH";
    forecastWind_3.textContent = "Wind: " + cityforecast.daily[2].wind_speed + "MPH";
    forecastWind_4.textContent = "Wind: " + cityforecast.daily[3].wind_speed + "MPH";
    forecastWind_5.textContent = "Wind: " + cityforecast.daily[4].wind_speed + "MPH";

    //humidty
    forecastHumidity_1.textContent = "Humidity: " + cityforecast.daily[0].humidity + " %";
    forecastHumidity_2.textContent = "Humidity: " + cityforecast.daily[1].humidity + " %";
    forecastHumidity_3.textContent = "Humidity: " + cityforecast.daily[2].humidity + " %";
    forecastHumidity_4.textContent = "Humidity: " + cityforecast.daily[3].humidity + " %";
    forecastHumidity_5.textContent = "Humidity: " + cityforecast.daily[4].humidity + " %";
}

function dateConvert(unixDate) {
    let myDate = new Date(unixDate*1000);
    let dd = String(myDate.getDate()).padStart(2, '0');
    let mm = String(myDate.getMonth() + 1).padStart(2, '0'); 
    let yyyy = myDate.getFullYear();
    
    myDate = mm + '/' + dd + '/' + yyyy;

    return(myDate);
}

let saveCity = function(cityName) {
    const searchedCity = {
        city: cityName,
    }
    searchedCities.push(searchedCity);
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
}

function populatePastSearches() {

    if (previousCity === "yes") {
        previousCity = "";
    } else {
        if (savedRun === "yes") {
            let previousCityEl = document.createElement("button");
            previousCityEl.id = "previousCity-"+searchedCities.length ;
            previousCityEl.className = "saved btn";
            previousCityEl.textContent = city[0].toUpperCase() + city.slice(1);
            previousCityEl.style.backgroundColor = '#D3D3D3';
            savedLocationEl.append(previousCityEl);
        } else {
            if (searchedCities.length > 0) {
                for (let j = 0; j < searchedCities.length; j++) {
                    
                   let previousCityEl = document.createElement("button");
                   previousCityEl.id = "previousCity-"+j;
                   previousCityEl.className = "saved btn";
                   previousCityEl.textContent = searchedCities[j].city;
                   previousCityEl.style.backgroundColor = '#D3D3D3';
                   savedLocationEl.append(previousCityEl);
                   
                }
            }
        }
    }
}

getCurrentWeather();