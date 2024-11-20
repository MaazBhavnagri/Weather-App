document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.form');
    const cityInput = document.getElementById('inp');
    const cityName = document.getElementById('city');
    const dateElement = document.getElementById('date');
    const temperature = document.getElementById('temp');
    const weatherDescription = document.querySelector('.weather span');
    const weatherIcon = document.querySelector('.weather i');
    const windSpeed = document.getElementById('speed');
    const humidity = document.getElementById('per');
    const visibility = document.getElementById('visibledis');

    const apiKey = '5d0bdfe96140e2f3de9aaf5e89986c18';

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        }
    });

    function fetchWeatherData(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    updateWeatherUI(data);
                } else {
                    alert("City not found!");
                }
            })
            .catch(error => console.error("Error fetching the weather data: ", error));
    }

    function updateWeatherUI(data) {
        const weather = data.weather[0];
        const temp = data.main.temp;
        const wind = data.wind.speed;
        const humidityValue = data.main.humidity;
        const visibilityValue = data.visibility / 1000;

        cityName.textContent = data.name;
        dateElement.textContent = new Date().toLocaleDateString();

        weatherIcon.textContent = getWeatherIcon(weather.icon);
        weatherDescription.textContent = weather.main;

        temperature.textContent = `${Math.round(temp)}°C`;
        windSpeed.textContent = `${Math.round(wind)} KM/H`;
        humidity.textContent = `${humidityValue}%`;
        visibility.textContent = `${visibilityValue.toFixed(1)} KM`;
    }

    function getWeatherIcon(iconCode) {
        switch (iconCode) {
            case '01d':
            case '01n':
                return 'wb_sunny';
            case '02d':
            case '02n':
                return 'cloud';
            case '03d':
            case '03n':
                return 'cloud_queue';
            case '04d':
            case '04n':
                return 'cloud';
            case '09d':
            case '09n':
                return 'umbrella';
            case '10d':
            case '10n':
                return 'rain';
            case '11d':
            case '11n':
                return 'flash_on';
            case '13d':
            case '13n':
                return 'ac_unit';
            case '50d':
            case '50n':
                return 'fog';
            default:
                return 'wb_cloudy';
        }    
    }
});
