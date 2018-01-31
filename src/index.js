



function updateByCity() {
  const apiPath = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const appId = '&APPID=bb94df7bc21231587c47bcd5a7e82665';
  const units = '&units=metric';
  let inputValue = document.getElementById('user-input').value;

  if (inputValue == '') {
    alert('No city in input field!');
    throw new Error('No city in input field!');
  }

  let city = inputValue;
  const url = apiPath + city + units + appId;
  document.getElementById('wrapper').style.display = 'flex';
  sendRequest(url);

  f.setAttribute("style","color: #f9e061; background-color: black;");
  c.setAttribute("style","color: black; background-color: #f9e061;");
  k.setAttribute("style","color: #f9e061; background-color: black;");
  c.disabled = true;

  changeToC();
}



// rounding numbers
function round(value, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

// handling Enter press
function handle(e) {
  if (e.keyCode === 13) {
    // preventing this function to run before pressing Enter
    e.preventDefault();
    updateByCity();
  }
}

function sendRequest(url){
  // fetch data to retrieve json from openweathermap api
  fetch(url)
    .then(response => response.json())
    .then(json => {
      const main = {};
      main.city = json.name;
      main.temp = json.main.temp;
      main.pres = json.main.pressure;
      main.humi = json.main.humidity;
      main.windSpeed = json.wind.speed;
      main.desc = json.weather['0'].description;
      main.icon = json.weather['0'].icon;
      main.windDir = json.wind.deg;
      // passing fetched data to function passData
      passData(main);
    })
}

function passData(main) {
  city.innerHTML = main.city;
  temp.innerHTML = round(main.temp, 0) + ' ' + '°C';
  pres.innerHTML = main.pres + ' ' + 'hPa';
  humi.innerHTML = main.humi + ' ' + '%';
  windSpeed.innerHTML = main.windSpeed + ' ' + 'm/s';
  weather.innerHTML = main.desc;

  const windDir = round(main.windDir, 0);

  const iconObj = {};
  // day icons
  iconObj['01d'] = 'wi wi-day-sunny';
  iconObj['02d'] = 'wi wi-day-cloudy';
  iconObj['03d'] = 'wi wi-cloud';
  iconObj['04d'] = 'wi wi-cloudy';
  iconObj['09d'] = 'wi wi-rain';
  iconObj['10d'] = 'wi wi-day-rain';
  iconObj['11d'] = 'wi wi-thunderstorm';
  iconObj['13d'] = 'wi wi-snow';
  iconObj['50d'] = 'wi wi-fog';
  // night icons
  iconObj['01n'] = 'wi wi-night-clear';
  iconObj['02n'] = 'wi wi-night-alt-cloudy';
  iconObj['03n'] = 'wi wi-cloud';
  iconObj['04n'] = 'wi wi-cloudy';
  iconObj['09n'] = 'wi wi-rain';
  iconObj['10n'] = 'wi wi-night-alt-hail';
  iconObj['11n'] = 'wi wi-thunderstorm';
  iconObj['13n'] = 'wi wi-snow';
  iconObj['50n'] = 'wi wi-fog';

  // iterating object to choose weather icon
  for (let item in iconObj) {
    if (item === main.icon) {
      const icon = document.getElementById('weather-icon');
      icon.className = '';
      icon.className += ' '+iconObj[item];
    }
  }
}

window.onload = function() {
  city = document.getElementById('city');
  temp = document.getElementById('temp');
  pres = document.getElementById('pres');
  humi = document.getElementById('humi');
  windSpeed = document.getElementById('wind-speed');
  weather = document.getElementById('weather');
  disable();
}

let fahr = false;
let celsius = true;
let kelvin = false;

const f = document.getElementById('to-f');
const c = document.getElementById('to-c');
const k = document.getElementById('to-k');

// disable button
function disable() {
  if (fahr === true) {
    f.setAttribute("style","color: black; background-color: #f9e061;");
    c.setAttribute("style","color: #f9e061; background-color: black;");
    k.setAttribute("style","color: #f9e061; background-color: black;");
  } else if (celsius === true) {
    f.setAttribute("style","color: #f9e061; background-color: black;");
    c.setAttribute("style","color: black; background-color: #f9e061;");
    k.setAttribute("style","color: #f9e061; background-color: black;");
  } else if (kelvin === true) {
    f.setAttribute("style","color: #f9e061; background-color: black;");
    c.setAttribute("style","color: #f9e061; background-color: black;");
    k.setAttribute("style","color: black; background-color: #f9e061;");
  }
}

// change temperature to fahrenheit
function changeToF() {
  let temp = parseFloat(document.getElementById('temp').innerHTML);
  if (celsius === true) {
    temp = temp * 1.8 + 32;
  } else if (kelvin === true) {
    temp = temp * 1.8 - 459.67;
  }
  document.getElementById('temp').innerHTML = round(temp, 0) + ' ' + '°F';
  f.disabled = true;
  c.disabled = false;
  k.disabled = false;
  fahr = true;
  celsius = false;
  kelvin = false;
  disable();
}

// change temperature to celsuus
function changeToC() {
  let temp = parseFloat(document.getElementById('temp').innerHTML);
  if (fahr === true) {
    temp = (temp - 32) / 1.8;
  } else if (kelvin === true) {
    temp = temp - 273.15;
  }

  document.getElementById('temp').innerHTML = round(temp, 0) + ' ' + '°C';
  f.disabled = false;
  c.disabled = true;
  k.disabled = false;
  fahr = false;
  celsius = true;
  kelvin = false;
  disable();
}

// change temperature to kelvin
function changeToK() {
  let temp = parseFloat(document.getElementById('temp').innerHTML);
  if (celsius === true) {
    temp = temp + 273.15;
  } else if (fahr === true) {
    temp = (temp + 459.67) / 1.8;
  }
  document.getElementById('temp').innerHTML = round(temp, 0) + ' ' + 'K';
  f.disabled = false;
  c.disabled = false;
  k.disabled = true;
  fahr = false;
  celsius = false;
  kelvin = true;
  disable();
}
