const API_KEY = "7e109d90d6d56e8ac26c8312c137c2c7";

const form = document.querySelector("#form");
const input = document.querySelector(".form__input");

const img = document.querySelector(".weather__img");
const temp = document.querySelector(".weather__temp");
const city = document.querySelector(".weather__city");

const humidity = document.querySelector("#humidity");
const speed = document.querySelector("#speed");

form.onsubmit = submitHandler;

async function submitHandler(e) {
    e.preventDefault();
    const cityName = input.value.trim();

    if (!cityName) {
        console.log("Enter city name");
        return;
    }

    const cityInfo = await GetGeo(cityName);
    const weatherInfo = await GetWeather(cityInfo[0].lat, cityInfo[0].lon);
    const weatherData = {
        name: weatherInfo.name,
        temp: weatherInfo.main.temp,
        humidity: weatherInfo.main.humidity,
        speed: weatherInfo.wind.speed,
        main: weatherInfo.weather[0].main
    };

    renderWeatherData(weatherData);
    form.reset();
}

async function GetGeo(name) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;
    const response = await fetch(geoUrl);
    const data = await response.json();

    return data;
}

async function GetWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(weatherUrl);
    const data = await response.json();

    return data;
}

function renderWeatherData(data) {
    temp.innerText = Math.round(+data.temp) + "°c";
    city.innerText = data.name;
    humidity.innerText = data.humidity + "%";
    speed.innerText = data.speed + " km/h";
    img.src = `img\\weather\\${data.main}.png`;
}