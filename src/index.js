function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
   let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windSpeedElement = document.querySelector("#wind-speed");
   let timeElement = document.querySelector("#time");
   let date = new Date(response.data.time * 1000);

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature); 
}

function formatDate(date) {
let minutes = date.getMinutes();
let hours = date.getHours();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];


let day = days[date.getDay()];

if (minutes < 10) {
minutes = `0${minutes}`;
}

return `${day} ${hours}:${minutes}`;

}

function searchCity(city) {
    let apiKey = "ac5dab4e2fef8baf42t9c2c10885f33o";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);

}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

function displayForecast() {
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";

    days.forEach(function (day) {
        forecastHtml = 
        forecastHtml +
    
     `<div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" />
    <div class="weather-forecast-icon"></div>
    <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature"> <strong>15&deg;</strong></span>
    <span class="weather-forecast-temperature">9&deg;</span>
    </div>
    </div>
    `;
});

let forecastElement = document.querySelector("#forecast");
forecast.innerHTML = forecastHtml;

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");
displayForecast();
