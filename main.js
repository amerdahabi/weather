const apiKey = "15720594108c8eab2baccbd663bdb296";
let input = document.querySelector(".input");
let form = document.querySelector(".form");
let lat;
let long;

form.addEventListener("submit", function (e) {
  if (!input.value) {
    e.preventDefault();
    fetchLocation();
  } else {
    e.preventDefault();
    const location = input.value;
    fetchCity(location);
  }
});

function fetchLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    long = position.coords.longitude;
    lat = position.coords.latitude;

    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        renderData(data);
      });
  });
}

function fetchCity(location) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderData(data);
    });
}

function getTime(unix) {
  let date = new Date(unix * 1000);
  let time = `${date.getHours()}:${date.getMinutes()}`;
  return time;
}

function renderData(data) {
  let temperatureDescrition = document.querySelector(
    ".temperature-description"
  );
  temperatureDescrition.innerHTML = `<p>${data.weather[0].description}</p>`;

  let locationTimezone = document.querySelector(".location-timezone");
  locationTimezone.innerHTML = data.name;

  let degree = document.querySelector(".degree");
  degree.innerHTML = Math.floor(data.main.temp) - 273; //KELVIN

  let wind = document.querySelector(".wind");
  wind.innerHTML = `${data.wind.speed} m/s`;

  let icon = document.querySelector(".icon");
  icon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png", width=100px/>`;

  let sunrise = document.querySelector(".sunrise");
  sunrise.innerHTML = `<p>Sunrise at ${getTime(data.sys.sunrise)}<p/>`;

  let sunset = document.querySelector(".sunset");
  sunset.innerHTML = `<p>Sunset at ${getTime(data.sys.sunset)}<p/>`;
}
