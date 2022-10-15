const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const API_KEY = 'a7e97ca14eb00aee24f5e5ef8502534a'


setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrHormat = hour >= 13 ? hour % 12 : hour
  const minutes = time.getMinutes();
  const minutesFormat = minutes < 10 ? '0' + minutes : minutes
  const ampm = hour >= 12 ? 'PM' : 'AM'

  timeEl.innerHTML = hoursIn12HrHormat + ':' + minutesFormat + ' ' + `<span id="am-pm">${ampm}</span>`

  dateEl.innerHTML = days[day] + ', ' + months[month] + ' ' + date

}, 1000);

getWeatherData()
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success)

    let { latitude, longitude } = success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {
      console.log(data)
      showWeatherData(data);
    })

  })
}

function showWeatherData(data) {
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

  currentWeatherItemsEl.innerHTML =
    `<div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}%</div>
  </div>
  <div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
  </div>
  <div class="weather-item">
    <div>Wind Speed</div>
    <div>${wind_speed} MPH</div>
  </div>
  <div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise * 1000).format('h:mm a')}</div>
  </div>
  <div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset * 1000).format('h:mm a')}</div>
  </div>`;

  let otherDayForecast = ''
  data.daily.forEach((day, index) => {
    if (index == 0) {
      currentTempEl.innerHTML = `
      <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather w-icon" class="w-icon">
      <div class="other">
        <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
        <div class="temp">Night - ${day.temp.night}&#176; F</div>
        <div class="temp">Day - ${day.temp.day}&#176; F</div>
      </div>
      `
    } else {
      otherDayForecast += `
      <div class="weather-forecast-item">
        <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather w-icon" class="w-icon">
        <div class="temp">Night - ${day.temp.night}&#176; F</div>
        <div class="temp">Day - ${day.temp.day}&#176; F</div>
      </div>`

    }
  })

  weatherForecastEl.innerHTML = otherDayForecast

}