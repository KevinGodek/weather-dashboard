// variables
let searchFormEl = document.querySelector('#town-form');
let townSearchEl = document.querySelector('#townName');
let searchButtonEl = document.querySelector('#searchButton');
const searchedTowns = JSON.parse(localStorage.getItem("searchedTowns")) || [];
let savedTownEl = document.querySelector('#savedLocations');
// weather dashboard
let townNameEl = document.querySelector('#townIcon');
let currentClimateel = document.querySelector('#currentClimate');
let currentWindEl = document.querySelector('#currentWind');
let currentHumidityEl = document.querySelector('#currentHumidity');
let currentUvIndexEl = document.querySelector('#currentUVIndex');
let currentImage = document.querySelector('#currentIcon');
// forecast day 1
let forecastDay_1 = document.querySelector('#forecastDay-1');
let forecastClimate_1 = document.querySelector('#climateDay-1');
let forecastWind_1 = document.querySelector('#windDay-1');
let forecastHumidity_1 = document.querySelector('#humidityDay-1');
// forecast day 2
let forecastDay_2 = document.querySelector('#forecastDay-2');
let forecastClimate_2 = document.querySelector('#climateDay-2');
let forecastWind_2 = document.querySelector('#windDay-2');
let forecastHumidity_2 = document.querySelector('#humidityDay-2');
// forecast day 3
let forecastDay_3 = document.querySelector('#forecastDay-3');
let forecastClimate_3 = document.querySelector('#climateDay-3');
let forecastWind_3 = document.querySelector('#windDay-3');
let forecastHumidity_3 = document.querySelector('#humidityDay-3');
// forecast day 4
let forecastDay_4 = document.querySelector('#forecastDay-4');
let forecastClimate_4 = document.querySelector('#climateDay-4');
let forecastWind_4 = document.querySelector('#windDay-4');
let forecastHumidity_4 = document.querySelector('#humidityDay-4');
// forecast day 5
let forecastDay_5 = document.querySelector('#forecastDay-5');
let forecastClimate_5 = document.querySelector('#climateDay-5');
let forecastWind_5 = document.querySelector('#windDay-5');
let forecastHumidity_5 = document.querySelector('#humidityDay-5');
// forecast images
let forecastIcon_1 = document.querySelector('#forecast-image-1');
let forecastIcon_2 = document.querySelector('#forecast-image-2');
let forecastIcon_3 = document.querySelector('#forecast-image-3');
let forecastIcon_4 = document.querySelector('#forecast-image-4');
let forecastIcon_5 = document.querySelector('#forecast-image-5');

//API 
let apiKey = "807260d60be85ac5c384c80bba453072";
let town = "orlando";

//Trackers for only displaying saved searches at correct times
let savedRun = "";
let pastTown = "";

// Event Listener
searchButtonEl.addEventListener("click", function() {
    console.log(townSearchEl.value)
    if (townSearchEl.value === "" || townSearchEl.value === " " || townSearchEl.value === null)  {
    } else {
        town = townSearchEl.value;
        getCurrentClimate();
        saveTown(town[0].toUpperCase() + town.slice(1));
        townSearchEl.value = "";
    }
});
$(document).on("click", ".saved", function() {
    let text = $(this)
        .text()
        .trim();
   town = text;
   pastTown = "yes";
   getCurrentClimate();
});

// Functions
let getCurrentClimate = function() {
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + town + "&appid=" + apiKey + "&units=imperial";
    fetch(apiURL).then(function(response) {
        response.json().then(function(data) {
            displayCurrentClimate(data);
        });
    });
    getSearchHistory();
    savedRun = "yes";
}

function displayCurrentClimate(townInfo) {
    // climate
    let currentClimate = townInfo.main.temp;
    currentClimateel.textContent = "Temp: " + currentClimate  + " \xB0 F";
    // day
    let currentDate = dateConvert(townInfo.dt);
    // current weather
    let currentConditionIcon = townInfo['weather'][0]['icon'];
    //humidity
    let humidity = townInfo.main.humidity;
    currentHumidityEl.textContent = "Humidity: " + humidity + " %";

    //wind speed
    let windSpeed = townInfo.wind.speed;
    currentWindEl.textContent = "Wind: " + windSpeed + " MPH";

    //town name
    townNameEl.textContent = town[0].toUpperCase() + town.slice(1) + " (" + currentDate + ")";

    currentImage.src = "http://www.openweathermap.org/img/wn/" + currentConditionIcon + "@2x.png";

    //get lat and long to get uvindex
    let townLat = townInfo.coord.lat;
    let townLong = townInfo.coord.lon;

    displayUvIndexForecast(townLat, townLong)
}

function displayUvIndexForecast(lat, long) {
     uvforecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +  "&lon=" + long+ "&exclude={part}&appid=" + apiKey + "&units=imperial";
    fetch(uvforecastURL).then(function(response) {
        response.json().then(function(uvforecastData) {
            //uv index
            let uvIndex = uvforecastData.current.uvi;
            if (uvIndex >= 3) {
                currentUvIndexEl.style.backgroundColor = "#FFFF00";
            }
            if (uvIndex >= 6) {
                currentUvIndexEl.style.backgroundColor = "#AA0000";
            } 
            currentUvIndexEl.textContent =  uvIndex;
            dispalyWeatherForecast(uvforecastData);
        });
    });
}

function dispalyWeatherForecast(townforecast) {
    // climate
    forecastClimate_1.textContent = "Temp: " + townforecast.daily[0].temp.day + " \xB0 F"; 
    forecastClimate_2.textContent = "Temp: " + townforecast.daily[1].temp.day + " \xB0 F"; 
    forecastClimate_3.textContent = "Temp: " + townforecast.daily[2].temp.day + " \xB0 F"; 
    forecastClimate_4.textContent = "Temp: " + townforecast.daily[3].temp.day + " \xB0 F"; 
    forecastClimate_5.textContent = "Temp: " + townforecast.daily[4].temp.day + " \xB0 F"; 
    // day
    let currentDay_1 = dateConvert(townforecast.daily[0].dt);
    let currentDay_2 = dateConvert(townforecast.daily[1].dt);
    let currentDay_3 = dateConvert(townforecast.daily[2].dt);
    let currentDay_4 = dateConvert(townforecast.daily[3].dt);
    let currentDay_5 = dateConvert(townforecast.daily[4].dt);
    forecastDay_1.textContent = currentDay_1;
    forecastDay_2.textContent = currentDay_2;
    forecastDay_3.textContent = currentDay_3;
    forecastDay_4.textContent = currentDay_4;
    forecastDay_5.textContent = currentDay_5;
    //icon
    let icon_1 = townforecast.daily[0].weather[0].icon;
    let icon_2 = townforecast.daily[1].weather[0].icon;
    let icon_3 = townforecast.daily[2].weather[0].icon;
    let icon_4 = townforecast.daily[3].weather[0].icon;
    let icon_5 = townforecast.daily[4].weather[0].icon;
    forecastIcon_1.src = "http://www.openweathermap.org/img/wn/" + icon_1 + "@2x.png";
    forecastIcon_2.src = "http://www.openweathermap.org/img/wn/" + icon_2 + "@2x.png";
    forecastIcon_3.src = "http://www.openweathermap.org/img/wn/" + icon_3 + "@2x.png";
    forecastIcon_4.src = "http://www.openweathermap.org/img/wn/" + icon_4 + "@2x.png";
    forecastIcon_5.src = "http://www.openweathermap.org/img/wn/" + icon_5 + "@2x.png";

    //wind
    forecastWind_1.textContent = "Wind: " + townforecast.daily[0].wind_speed + "MPH";
    forecastWind_2.textContent = "Wind: " + townforecast.daily[1].wind_speed + "MPH";
    forecastWind_3.textContent = "Wind: " + townforecast.daily[2].wind_speed + "MPH";
    forecastWind_4.textContent = "Wind: " + townforecast.daily[3].wind_speed + "MPH";
    forecastWind_5.textContent = "Wind: " + townforecast.daily[4].wind_speed + "MPH";

    //humidty
    forecastHumidity_1.textContent = "Humidity: " + townforecast.daily[0].humidity + " %";
    forecastHumidity_2.textContent = "Humidity: " + townforecast.daily[1].humidity + " %";
    forecastHumidity_3.textContent = "Humidity: " + townforecast.daily[2].humidity + " %";
    forecastHumidity_4.textContent = "Humidity: " + townforecast.daily[3].humidity + " %";
    forecastHumidity_5.textContent = "Humidity: " + townforecast.daily[4].humidity + " %";
}

function dateConvert(unixDate) {
    let myDate = new Date(unixDate*1000);
    let dd = String(myDate.getDate()).padStart(2, '0');
    let mm = String(myDate.getMonth() + 1).padStart(2, '0'); 
    let yyyy = myDate.getFullYear();
    myDate = mm + '/' + dd + '/' + yyyy;
    return(myDate);
}

let saveTown = function(townName) {
    const searchedTown = {
        town: townName,
    }
    searchedTowns.push(searchedTown);
    localStorage.setItem("searchedTowns", JSON.stringify(searchedTowns));
}

function getSearchHistory() {
    if (pastTown === "yes") {
        pastTown = "";
    } else {
        if (savedRun === "yes") {
            let previousTownEl = document.createElement("button");
            previousTownEl.id = "pastTown-"+searchedTowns.length ;
            previousTownEl.className = "saved btn";
            previousTownEl.textContent = town[0].toUpperCase() + town.slice(1);
            previousTownEl.style.backgroundColor = '#D3D3D3';
            savedTownEl.append(previousTownEl);
        } else {
            if (searchedTowns.length > 0) {
                for (let j = 0; j < searchedTowns.length; j++) {
                   let previousTownEl = document.createElement("button");
                   previousTownEl.id = "pastTown-"+j;
                   previousTownEl.className = "saved btn";
                   previousTownEl.textContent = searchedTowns[j].town;
                   previousTownEl.style.backgroundColor = '#D3D3D3';
                   savedTownEl.append(previousTownEl); 
                }
            }
        }
    }
}

getCurrentClimate();