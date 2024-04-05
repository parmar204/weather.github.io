let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather_temperature");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_feelLikes = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector('.weather_search');

const getcode = (code) => {
    return new Intl.DisplayNames([code],{type:'region'}).of(code)
}

const getDate = (dt) => {
    let dte = 1711801723;
    const curDate = new Date(dte * 1000);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }

    const formatter = new Intl.DateTimeFormat("en-US",options);
    return formatter.format(curDate)
}

let city = "pune";

citySearch.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = document.querySelector(".city_name");
    city = cityName.value;
    getWeatherData();
    cityName.value = "";
})

const getWeatherData = async () =>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=88f802ae781b3805ad3918687cc50a26`;

    try {

        const res = await fetch(weatherUrl);
        const data = await res.json();
        // console.log(data);
        const { main , name , weather , wind , sys , dt } = data;
        cityName.innerHTML = `${name}, ${getcode(sys.country)}`;
        dateTime.innerHTML = getDate(dt);
        w_temperature.innerHTML = `${main.temp}&#176`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;
        w_feelLikes.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_pressure.innerHTML = `${main.pressure}hPa`;
        w_wind.innerHTML = `${wind.speed}m/s`;
        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    } catch (error) {
        console.log(error);
    }
}

document.body.addEventListener("load", getWeatherData())
