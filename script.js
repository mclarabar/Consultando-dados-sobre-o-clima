const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const cityName = document.getElementById('city-name');
const localTime = document.getElementById('local-time');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const uvIndex = document.getElementById('uv-index');
const errorMessage = document.getElementById('error-message');

const apiKey = 'f77c06b8f2734d139f2140028251108';

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`);

        if (!response.ok) {
            throw new Error(`Cidade "${city}" não encontrada`);
        }

        const data = await response.json();
        renderWeather(data);
    } catch (error) {
        renderError(error.message);
    }
}

function renderWeather(data) {
    errorMessage.textContent = '';

    const dataAPI = new Date(data.location.localtime);
    const opcoesFormato = { 
        day: 'numeric', 
        month: 'numeric', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric' 
    };
    const dataTransformada = dataAPI.toLocaleString('pt-BR', opcoesFormato);
    
    cityName.textContent = data.location.name;
    localTime.textContent = dataTransformada;
    weatherIcon.src = data.current.condition.icon;
    weatherIcon.alt = data.current.condition.text;
    temperature.textContent = `${data.current.temp_c} °C`;
    condition.textContent = data.current.condition.text;
    feelsLike.textContent = `${data.current.feelslike_c} °C`;
    humidity.textContent = `${data.current.humidity}%`;
    windSpeed.textContent = `${data.current.wind_kph} km/h`;
    pressure.textContent = `${data.current.pressure_mb} mb`;
    visibility.textContent = `${data.current.vis_km} km`;
    uvIndex.textContent = data.current.uv;

    weatherResult.style.display = 'block';
}

function renderError(message) {
    errorMessage.textContent = message;
    weatherResult.style.display = 'none';
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        renderError('Por favor, digite o nome de uma cidade válida.');
    }
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});
