//Button Geolocation API

function showPosition(position) {
  let apiKey = "57d09144bf433da24574a6e95f14182c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getPosition);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchCity(city.value);
}

function searchCity(city) {
  let apiKey = "57d09144bf433da24574a6e95f14182c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

const temperatureElement = document.querySelector("#temp");
const form = document.querySelector("#searchForm");
const fahrenheitLink = document.querySelector("#fahrenheit-link");
const celsiusLink = document.querySelector("#celsius-link");

let celsiusTemperature = null;

function displayFahrenheitTemperature() {
  const fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature() {
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

form.addEventListener("submit", search);

fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//ShowTemperaturesforCities

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

//Current Format Time & Date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `Last updated on: ${day} ${hours}:${minutes}`;
}

//FormatDayWeeklyForecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Weekly Forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let day = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
  <div class="weather-forecast-date" >${formatDay(forecastDay.dt)}</div>
  <img 
  src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
  alt="" 
  width="42"/>
</div>

  <div class="weather-forecast-temperature">
   <span class="weather-forecast-temperature-max">
  High:${Math.round(forecastDay.temp.max)}°C
   </span>
   <br />
   <span class="weather-forecast-temperature-min">
  Low:${Math.round(forecastDay.temp.min)}°C
   </span> 
  </div>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentWeather(event) {
  event.preventDefault();
  searchCity(getPosition);
}

//searchCity("Austin");
showCurrentWeather(); // Call the function without an event
