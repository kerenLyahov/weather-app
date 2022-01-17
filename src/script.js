function todayDate() {
  let date = new Date();
  let month = [
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
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  document.getElementById("today-day").innerHTML = day[date.getDay()];
  for (let i = 1; i < 6; i++) {
    let j = date.getDay() + i;
    if (j > 6) {
      j = date.getDay() + i - 7;
    }
    document.getElementById(`day${i}`).innerHTML = day[j];
  }

  let todayDate = `${date.getDate()}/${
    month[date.getMonth()]
  }/${date.getFullYear()}`;
  document.getElementById("today-date").innerHTML = todayDate;

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let todayTime = `${hours}:${minutes}`;
  document.getElementById("today-time").innerHTML = todayTime;
}

function showTemp(response) {
  //set the name + current temp data
  let cityNameElement = document.querySelector("#city-display");
  cityNameElement.innerHTML = response.data.name;
  let currentTemp = document.querySelector("#temp_now");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let todayMinTemp = document.querySelector("#todayMin");
  todayMinTemp.innerHTML = Math.round(response.data.main.temp_min);
  let todayMaxTemp = document.querySelector("#todayMax");
  todayMaxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let description = document.querySelector("#todayDescription");
  description.innerHTML = response.data.weather[0].description;
}
function parameters(response) {
  // currenet parameters
  let windspeed = document.querySelector("#winSpeed_number");
  windspeed.innerHTML = response.data.wind.speed;
  let humidity = document.querySelector("#humidity_number");
  humidity.innerHTML = response.data.main.humidity;

  // update sunrise time
  let sunriseTime = new Date(response.data.sys.sunrise * 1000);
  let sunriseHours = sunriseTime.getHours(response.data.sys.sunrise * 1000);
  if (sunriseHours < 10) {
    sunriseHours = `0${sunriseHours}`;
  }
  let sunriseMinutes = sunriseTime.getMinutes(sunriseTime);
  if (sunriseMinutes < 10) {
    sunriseMinutes = `0${sunriseMinutes}`;
  }
  let sunrise = `${sunriseHours}:${sunriseMinutes}`;
  document.querySelector("#sunrise_number").innerHTML = sunrise;
  // update sunset time
  let sunsetTime = new Date(response.data.sys.sunset * 1000);
  let sunsetHours = sunsetTime.getHours(sunsetTime);
  if (sunsetHours < 10) {
    sunsetHours = `0${hours}`;
  }
  let sunsetMinutes = sunsetTime.getMinutes(sunsetTime);
  if (sunsetMinutes < 10) {
    sunsetMinutes = `0${sunsetMinutes}`;
  }
  let sunset = `${sunsetHours}:${sunsetMinutes}`;
  document.querySelector("#sunset_number").innerHTML = sunset;
  //weather icon
  let iconElement = document.querySelector(".weather-icon");
  let iconID = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconID}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `icon of ${response.data.weather[0].description}`
  );
}
function next5DaysData(response) {
  //update the temp & icon for the next 5 days
  for (let i = 1; i < 6; i++) {
    let minTemp = Math.round(response.data.daily[`${i}`].temp.min);
    let maxTemp = Math.round(response.data.daily[`${i}`].temp.max);
    let temp = `${maxTemp}° / ${minTemp}°`;
    document.querySelector(`.MinMax${i}`).innerHTML = temp;

    let iconElement = document.querySelector(`.icon${i}`);
    let iconID = response.data.daily[`${i}`].weather[0].icon;
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${iconID}@2x.png`
    );
    iconElement.setAttribute(
      "alt",
      `icon of ${response.data.daily[`${i}`].weather[0].description}`
    );
  }
}
function cityNext5Days(response) {
  let unit = `metric`;
  let apiKey = `307efdb71bc67507048c93662d7db9da`;
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiURLNext5Days = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=current,hourly,minutely&appid=${apiKey}`;
  axios.get(apiURLNext5Days).then(next5DaysData);
}

function weatherData(city) {
  let unit = `metric`;
  let apiKey = `307efdb71bc67507048c93662d7db9da`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiURL).then(showTemp);
  axios.get(apiURL).then(parameters);
  axios.get(apiURL).then(cityNext5Days);
}

function showWeatherNext5Days() {
  //the next 5 days for Jerusalem
  let unit = `metric`;
  let apiKey = `307efdb71bc67507048c93662d7db9da`;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=31.769&lon=35.2163&units=${unit}&exclude=current,hourly,minutely&appid=${apiKey}`;
  axios.get(apiURL).then(next5DaysData);
}

function searchCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  weatherData(cityInputElement.value);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = `307efdb71bc67507048c93662d7db9da`;
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}
  `;

  let apiURLNext5Days = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=current,hourly,minutely&appid=${apiKey}`;

  axios.get(apiURLNext5Days).then(next5DaysData);
  axios.get(apiURL).then(parameters);
  axios.get(apiURL).then(showTemp);
}

function getApiPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

todayDate();

weatherData("Jerusalem");
showWeatherNext5Days();

let mainCity = document.querySelector("#search-city-form");
mainCity.addEventListener("submit", searchCity);

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getApiPosition);
