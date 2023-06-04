/*//display the current date and time using JavaScript: Tuesday 16:00
var today = new Date();
  var day = today.getDay();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var hour = today.getHours();
  var minutes = today.getMinutes();
  document.getElementById("info").innerHTML = ` ${days[day]} , ${hour}:${minutes}`;

  //Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
const form = document.getElementById('search-form');
      const result = document.getElementById('city');

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputCity = document.getElementById('city-input').value;

        result.innerHTML = `${inputCity}`;
      });*/

// Display temperature in Celsius and add a link to convert it to Fahrenheit.



/*import "./styles.css";*/

const temperature = document.getElementById('temperature');
  const convertTemp = document.getElementById('convertTemp');

  convertTemp.addEventListener('click', function(){
    if (convertTemp.innerHTML == '°C') {
      temperature.innerHTML = Math.round((parseInt(temperature.innerHTML) * 9)/5 + 32);
      convertTemp.innerHTML = '°F';
    } else {
      temperature.innerHTML = Math.round((parseInt(temperature.innerHTML) - 32) * 5/9);
      convertTemp.innerHTML = '°C';
    }
  });


  function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
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
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }
  
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }

  function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col card">
      <div class="WeatherForecastPreview">
      <div class="forecast-time">${formatDay(forecastDay.dt)}</div>
        <img
          src="./images/${
            forecastDay.weather[0].icon
          }.svg"
          width="90"
          height="90"
          alt=""
          id="icon
        />
        <div class="forecast-temperature">
                  <span class="forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `./images/${response.data.weather[0].icon}.svg`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");






      