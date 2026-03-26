// API Configuration
const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

// DOM Elements
const searchBox = document.querySelector('.search-box');
const locationBtn = document.querySelector('.location-btn');
const refreshBtn = document.querySelector('.refresh-btn');
const loadingEl = document.querySelector('.loading');
const errorEl = document.querySelector('.error');
const weatherContent = document.querySelector('.weather-content');

// State
let currentCity = '';
let refreshInterval = null;

// Event Listeners
searchBox.addEventListener('keypress', (evt) => {
  if (evt.keyCode === 13 && searchBox.value.trim()) {
    getWeatherByCity(searchBox.value.trim());
  }
});

locationBtn.addEventListener('click', getCurrentLocation);
refreshBtn.addEventListener('click', refreshWeather);

// Initialize app
function init() {
  const savedCity = localStorage.getItem('lastCity');
  if (savedCity) {
    getWeatherByCity(savedCity);
  } else {
    getCurrentLocation();
  }
}

// Get current location using Geolocation API
function getCurrentLocation() {
  if ('geolocation' in navigator) {
    showLoading();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        showError('Unable to get your location. Please search for a city.');
        console.error('Geolocation error:', error);
      }
    );
  } else {
    showError('Geolocation is not supported by your browser.');
  }
}

// Get weather by city name
function getWeatherByCity(city) {
  showLoading();
  fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      currentCity = city;
      localStorage.setItem('lastCity', city);
      displayWeather(data);
      startAutoRefresh();
    })
    .catch(error => {
      showError('City not found. Please try again.');
      console.error('Error fetching weather:', error);
    });
}

// Get weather by coordinates
function getWeatherByCoords(lat, lon) {
  showLoading();
  fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
    .then(response => response.json())
    .then(data => {
      currentCity = data.name;
      localStorage.setItem('lastCity', data.name);
      displayWeather(data);
      startAutoRefresh();
    })
    .catch(error => {
      showError('Unable to fetch weather data.');
      console.error('Error fetching weather:', error);
    });
}

// Display weather data
function displayWeather(data) {
  // Update city and date
  document.querySelector('.city').textContent = `${data.name}, ${data.sys.country}`;
  document.querySelector('.date').textContent = dateBuilder(new Date());
  
  // Update weather icon
  const weatherIcon = document.querySelector('.weather-icon i');
  const weatherCode = data.weather[0].main.toLowerCase();
  const iconCode = data.weather[0].icon;
  
  // Map weather conditions to Font Awesome icons
  let iconClass = 'fas fa-sun'; // default
  let iconColor = '#FDB813'; // default yellow
  
  if (weatherCode.includes('clear')) {
    iconClass = iconCode.includes('n') ? 'fas fa-moon' : 'fas fa-sun';
    iconColor = iconCode.includes('n') ? '#F4F6FF' : '#FDB813';
  } else if (weatherCode.includes('cloud')) {
    iconClass = 'fas fa-cloud';
    iconColor = '#B0BEC5';
  } else if (weatherCode.includes('rain') || weatherCode.includes('drizzle')) {
    iconClass = 'fas fa-cloud-rain';
    iconColor = '#5C7CFA';
  } else if (weatherCode.includes('thunderstorm')) {
    iconClass = 'fas fa-cloud-bolt';
    iconColor = '#FFD43B';
  } else if (weatherCode.includes('snow')) {
    iconClass = 'fas fa-snowflake';
    iconColor = '#E3F2FD';
  } else if (weatherCode.includes('mist') || weatherCode.includes('fog') || weatherCode.includes('haze')) {
    iconClass = 'fas fa-smog';
    iconColor = '#90A4AE';
  }
  
  weatherIcon.className = iconClass;
  weatherIcon.style.color = iconColor;
  
  // Update temperature
  document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
  
  // Update weather description
  document.querySelector('.weather').textContent = data.weather[0].description;
  
  // Update feels like
  document.querySelector('.feels-like span').textContent = Math.round(data.main.feels_like);
  
  // Update details
  document.querySelector('.hi-low').textContent = 
    `${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`;
  document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
  document.querySelector('.wind').textContent = `${data.wind.speed} m/s`;
  document.querySelector('.pressure').textContent = `${data.main.pressure} hPa`;
  
  // Update last updated time
  updateLastUpdatedTime();
  
  // Show weather content
  hideLoading();
  hideError();
  weatherContent.style.display = 'block';
  
  // Clear search box
  searchBox.value = '';
}

// Refresh current weather
function refreshWeather() {
  if (currentCity) {
    refreshBtn.classList.add('spinning');
    getWeatherByCity(currentCity);
    setTimeout(() => {
      refreshBtn.classList.remove('spinning');
    }, 1000);
  }
}

// Start auto-refresh (every 5 minutes)
function startAutoRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
  refreshInterval = setInterval(() => {
    if (currentCity) {
      getWeatherByCity(currentCity);
    }
  }, 5 * 60 * 1000); // 5 minutes
}

// Update last updated time
function updateLastUpdatedTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  document.querySelector('.update-time').textContent = timeString;
}

// Show loading state
function showLoading() {
  loadingEl.style.display = 'block';
  errorEl.style.display = 'none';
  weatherContent.style.display = 'none';
}

// Hide loading state
function hideLoading() {
  loadingEl.style.display = 'none';
}

// Show error
function showError(message) {
  document.querySelector('.error-message').textContent = message;
  errorEl.style.display = 'block';
  loadingEl.style.display = 'none';
  weatherContent.style.display = 'none';
}

// Hide error
function hideError() {
  errorEl.style.display = 'none';
}

// Date builder
function dateBuilder(d) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"
  ];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

// Initialize the app when page loads
init();
