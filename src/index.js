let now = new Date();
let h3 = document.querySelector("h3");

let date = now.getDate();
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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h3.innerHTML = `${day}, ${month} ${date} ${year} ${hour}:${minutes}`;

function showTemperature(response) {
  console.log(response.data.main.temp);
  let h2 = document.querySelector("h2");
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#temperature-description");
  let iconElement = document.querySelector("#icon");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  celsiusTemperature = response.data.main.temp;

  h2.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  if (searchInput.value) {
    searchCity(searchInput.value);
  } else {
    let h2 = document.querySelector("h2");
    h2.innerHTML = null;
    alert("Please type a city");
  }
}

function searchCity(city) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let celsiusTemperature = null;
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let displayFahrenheitTemperature = (displayCelsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(displayFahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(displayCelsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
navigator.geolocation.getCurrentPosition(retrievePosition);

let button = document.querySelector("#current-location-button");
button.addEventListener("click", retrievePosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("celsius-Link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Asheville");
