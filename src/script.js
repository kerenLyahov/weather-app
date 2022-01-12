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
  let currentTemp = document.querySelector("#temp_now");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let todayMinTemp = document.querySelector("#todayMin");
  todayMinTemp.innerHTML = Math.round(response.data.main.temp_min);
  let todayMaxTemp = document.querySelector("#todayMax");
  todayMaxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let description = document.querySelector("#todayDescription");
  description.innerHTML = response.data.weather[0].description;
  let windspeed = document.querySelector("#winSpeed_number");
  windspeed.innerHTML = response.data.wind.speed;
  let humidity = document.querySelector("#humidity_number");
  humidity.innerHTML = response.data.main.humidity;
  let date = new Date();
  console.log(date);
  let sunrise = document.querySelector("#sunrise_number");
  // sunrise.innerHTML = date(response.data.sys.sunrise * 1000);
  console.log(response.data.sys.sunrise * 1000);
  let sunrise_time = date(response.data.sys.sunrise * 1000);
  console.log(sunrise_time);
  let sunset = document.querySelector("#sunset_number");
  //console.log(date(response.data.sys.sunset * 1000));
  //sunset.innerHTML = date(response.data.sys.sunset * 1000);
}
// function tempUnit() {

//   let celsius = document.querySelector("#celsius").innerHTML;
//   let fahrenheit = document.querySelector("#fahrenheit").innerHTML;
//   celsius.addEventListener("click", function () {
//     unit === `metric`;
//     console.log(5);
//   });
//   fahrenheit.addEventListener("click", function () {
//     unit === `imperial`;
//     console.log(6);
//   });
// }

function weatherData() {
  let unit = `metric`;
  let apiKey = `307efdb71bc67507048c93662d7db9da`;
  city = document.querySelector("#city-display").innerHTML;

  //tempUnit();
  //console.log(unit);

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(showTemp);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let cityName = city.value;
  if (cityName !== "") {
    document.querySelector("#city-display").innerHTML = city.value;
  }
  weatherData();
}
function showCurrentcity(response) {
  document.querySelector("#city-display").innerHTML = response.data.name;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `307efdb71bc67507048c93662d7db9da`;
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}
  `;

  // console.log(apiURL);
  axios.get(apiURL).then(showTemp);
  axios.get(apiURL).then(showCurrentcity);
}

function getApiPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

todayDate();

weatherData();

let mainCity = document.querySelector("#search-city-form");
mainCity.addEventListener("submit", searchCity);

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getApiPosition);

// let celsius = document.querySelector("#celsius");
// let fahrenheit = document.querySelector("#fahrenheit");

// celsius.addEventListener("click", F_to_C);
// fahrenheit.addEventListener("click", C_to_F);

// console.log(apiURL);
