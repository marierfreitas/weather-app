function currentDate() {
  let now = new Date();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day}, ${hour}:${minutes}`;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "7f94287315df4241e13380459d3ec750";
  let city = document.querySelector("#city");
  let changeCity = document.querySelector("#change-city").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${changeCity}&appid=${apiKey}&units=metric`;
  city.innerHTML = changeCity;
  axios.get(url).then(displayWeather);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = " ";

  forecast.forEach(function days(forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="row"><div class="col-5 days">
         <div>${formatDay(forecastDay.dt)}</div>
        </div>
        
        <div class="col-3 icons-forecast">
          <div><img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            id="icon-day"
            alt=""
            width="35px"/>
          </div>
        </div>

        <div class="col-2 low-temperature">
          <div>${Math.round(forecastDay.temp.min)}</div>
        </div>

        <div class="col-2 high-temperature">
         <div>${Math.round(forecastDay.temp.max)}</div>
        </div></div>`;
    }
  });

  forecastHTML = forecastHTML;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7f94287315df4241e13380459d3ec750";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let city = response.data.name;
  let weatherDescription = response.data.weather[0].description;
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let currentWeather = document.querySelector("p.weather");
  let currentCity = document.querySelector("#city");
  let currentTemperature = document.querySelector("#current-temperature");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let highTemperature = document.querySelector("#high");
  let lowTemperature = document.querySelector("#low");

  celsiusTemperature = response.data.main.temp;

  highTemperature.innerHTML = Math.round(response.data.main.temp_max);
  lowTemperature.innerHTML = Math.round(response.data.main.temp_min);
  currentCity.innerHTML = city;
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  currentWeather.innerHTML = weatherDescription;
  currentHumidity.innerHTML = `${humidity}%`;
  currentWind.innerHTML = `${wind} km/hr`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function handlePosition(position) {
  let apiKey = "7f94287315df4241e13380459d3ec750";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let today = document.querySelector("p.today");
today.innerHTML = currentDate();

let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", searchCity);

getCurrentPosition();

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

let celsiusTemperature = null;

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", displayCelsius);

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", displayFahrenheit);
