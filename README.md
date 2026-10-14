# Real-Time Weather App 🌤️

A modern, responsive weather application that delivers real-time weather updates with a sleek, interactive gradient interface.

## Live Demo 🚀

Visit the deployed app here:

[Open Live Weather App](https://yogesh-patil2003.github.io/weather-app/)

![Weather App Preview](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/cloud-sun.svg)

## Features ✨

### 🔄 Real-Time Updates
- Auto-refresh weather data every 5 minutes
- Manual refresh button for instant updates
- Live timestamp showing the last data fetch time

### 📍 Smart Location
- Automatic geolocation using the browser's location API
- Global city search with instant results
- Saved last searched city using local storage

### 📊 Comprehensive Insights
- Current temperature with a "Feels Like" reading
- High/low temperature, humidity, wind speed, and pressure
- Dynamic weather icons powered by OpenWeatherMap

## Quick Start 🚀

### Option 1: Run locally with a simple HTTP server
1. Open your terminal.
2. Navigate to the project folder:
   ```bash
   cd weather-app
   ```
3. Start a local server:
   ```bash
   python -m http.server 8000
   ```
4. Open http://localhost:8000 in your browser.

### Option 2: VS Code Live Server
1. Open the project folder in VS Code.
2. Install the Live Server extension.
3. Click "Go Live" in the status bar.

## Project Structure 📁

```text
weather-app/
├── index.html    # App structure and markup
├── script.js     # Weather logic, API integration, and local storage
├── sty.css       # Styling, gradients, and responsive design
├── README.md     # Project documentation
└── assets/       # Optional static assets (if used)
```

## Technical Configuration 🔧

### API Setup
The app uses OpenWeatherMap API data. You can update the API configuration in `script.js`:

```javascript
const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};
```

### Customization
- Change units from metric to imperial by updating `&units=metric` in the request URL.
- Modify the theme colors from the CSS variables in `sty.css`.

## Troubleshooting 🔍
- Location denied: Allow location access in your browser.
- City not found: Verify the city name spelling.
- Network issues: Ensure internet connectivity is available.

---

**Data Source:** [OpenWeatherMap](https://openweathermap.org/)
**Icons:** [Font Awesome](https://fontawesome.com/)
