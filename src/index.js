// Feature #1

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

let today = document.querySelector("p.today");
today.innerHTML = currentDate();

function searchCity(event) {
  event.preventDefault();
  let apiKey = "7f94287315df4241e13380459d3ec750";
  let city = document.querySelector("#city");
  let changeCity = document.querySelector("#change-city").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${changeCity}&appid=${apiKey}&units=metric`;
  city.innerHTML = changeCity;
  axios.get(url).then(displayWeather);
}

let searchCityForm = document.querySelector("#search-city");
searchCityForm.addEventListener("submit", searchCity);

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

getCurrentPosition();

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

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

let celsiusTemperature = null;

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", displayCelsius);

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", displayFahrenheit);
