 //Button Geolocation API

 function showPosition(position) {
  let apiKey = "57d09144bf433da24574a6e95f14182c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentPosition);
  console.log (apiUrl);

}


function getCurrentPosition(event) {
    event.preventDefault();
  navigator.geolocation.getCurrentPosition (showPosition) ;

  };



let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentPosition);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let searchCity = document.querySelector("#city-input");
  cityElement.innerHTML = searchCity.value;
  let units = "metric";
  let apiKey = "57d09144bf433da24574a6e95f14182c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", search);

function handleSubmit(event) {
event.preventDefault();
let city = document.querySelector("#city-input").value;
searchCity(city);
}



//Temperature
function convertFahTemp(event) {
  event.preventDefault();
  let formatFah = document.querySelector("#temp");
  let fahrenheitLink = Math.round((32 * 9) / 5 + 32);
  formatFah.innerHTML = `${fahrenheitLink}°F`;
}
let fahTemp = document.querySelector("#fahrenheit");
fahTemp.addEventListener("click", convertFahTemp);

function convertCelTemp(event) {
  event.preventDefault();
  let formatCel = document.querySelector("#temp");
  formatCel.innerHTML = `19°C`;
}
let celsuisLink = document.querySelector("#celsius");
celsuisLink.addEventListener("click", convertCelTemp);



//Current Format Time & Date
function formatDate (timestamp){
let date = new Date(timestamp);
let h2 = document.querySelector("h2");
let hours = date.getHours();
let minutes = date.getMinutes();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[date.getDay()];

console.log (hours);

//return `${day} ${hours}:${minutes}`;
h2.innerHTML = `${day} ${hours}:${minutes}`;
}

function handleApiResponse(response){
let timestamp= response.data.dt;
formatDate (timestamp);
}

let searchCity = document.getElementById("#city-input").value;
let apiKey = "57d09144bf433da24574a6e95f14182c";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(handleApiResponse);


//ShowTemperaturesforCities

function showTemperature(response) {
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  let h1 = document.querySelector("h1");
  temperatureElement.innerHTML = `${temperature}°C | °F`;
  h1.innerHTML = response.data.name;
  let dateElement = document.querySelector("#date");
  dateElement = formatDate (response.data.dt * 1000);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#date").innerHTML = response.data.main.dt;


  console.log(temperature);
  console.log (response.data.wind.speed);
  
}
axios.get (apiUrl) .then (showTemperature);

let h1 = document.querySelector("location");
