/** @format */
window.addEventListener('DOMContentLoaded', () => {
    const api = {
        key: 'cf8033e9a4646314d2ad73575cf730a5',
        baseurl: 'https://api.openweathermap.org/data/2.5/',
    };
    const searchBox = document.querySelector('.search-box');

    searchBox.addEventListener('keypress', setQuery);

    function setQuery(e) {
        if (e.keyCode == 13) {
            getResults(searchBox.value);
        }
    }
    function getResults(query) {
        fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then((weather) => {
                return weather.json();
            })
            .then(displayResults);
    }

    function displayResults(weather) {
        console.log(weather);
        let city = document.querySelector('.location .city');
        city.innerHTML = `${weather.name}, ${weather.sys.country}`;

        let now = new Date();
        let date = document.querySelector('.location .date');
        date.innerHTML = dateBuilder(now);

        let temp = document.querySelector('.temp');

        temp.innerHTML = `${Math.round(weather.main.temp)}<span> °C</span>`;

        let weatherEl = document.querySelector('.weather');
        weatherEl.innerHTML = weather.weather[0].main;

        let hiLow = document.querySelector('.hi-low');

        hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
    }

    function dateBuilder(j) {
        let months = [
            'January',
            'Febraury',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        let days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        let day = days[j.getDay()];
        let date = j.getDate();
        let month = months[j.getMonth()];
        let year = j.getFullYear();
        return `${day} ${date} ${month} ${year}`;
    }
});
