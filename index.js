let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[now.getMonth()];

let currentYear = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let date = document.querySelector(".date");
date.innerHTML = `${currentDay} ${currentMonth} ${currentDate} ${currentYear} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function search(city) { 
  let apiKey = "5d8667ee7b2450bd924cdffccf269c9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}

function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city");
  let cityname = document.querySelector(".location");
  cityname.innerHTML = `${city.value}`;
  search(city.value);
}
search("delhi");

let cityform = document.querySelector("#city-form");
cityform.addEventListener("submit", updateCity);


let fahrenheitTemperature = null;

function Celsius(event) {
  event.preventDefault();
  let degree = document.querySelector(".current-temp");
  degree.innerHTML = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", Celsius);

function Fahrenheit(event) {
  event.preventDefault();
  let degree = document.querySelector(".current-temp");
  degree.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", Fahrenheit);

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `

        <div class="col-2 days">
          <h6>${formatDay(forecastDay.dt)}</h6>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" class="day-icons" />
          <span class="max-temp">${Math.round(
            forecastDay.temp.max
          )}°</span> / <span class="low-temp">${Math.round(
          forecastDay.temp.min
        )}°</span>
        </div>
    
      `;
          }
   
  });
 
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5d8667ee7b2450bd924cdffccf269c9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  fahrenheitTemperature = response.data.main.temp;
  let temperature = Math.round(response.data.main.temp);
  let degree = document.querySelector(".current-temp");
  degree.innerHTML = `${temperature}`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `${wind}mph`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function displayCurrentcity(response) {
  let cityName = response.data.name;
  let displayCity = document.querySelector(".location");
  displayCity.innerHTML = `${cityName}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5d8667ee7b2450bd924cdffccf269c9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(displayTemp);
  axios.get(`${apiUrl}`).then(displayCurrentcity);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}




let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", getCurrentPosition);
