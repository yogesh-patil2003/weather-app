# Real-Time Weather App 🌤️

A modern, responsive weather application that delivers real-time weather updates with a sleek, interactive gradient interface.

![Weather App Preview](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/cloud-sun.svg)

## Features ✨

### 🔄 Real-Time Updates
- **Auto-Refresh:** Weather data automatically updates every 5 minutes.
- **Manual Refresh:** One-click update button to get the latest data instantly.
- **Live Timestamp:** Shows exactly when the weather was last fetched.

### 📍 Smart Location
- **Geolocation:** Automatically detects your current city using the browser's API.
- **Global Search:** Search for any city worldwide with instant results.
- **Session Memory:** Remembers your last searched city for your next visit.

### 📊 Comprehensive Insights
- **Temperature:** Current temp with "Feels like" calibration.
- **Conditions:** High/Low range, humidity, wind speed, and atmospheric pressure.
- **Dynamic Icons:** Visual weather indicators powered by OpenWeatherMap.

## Quick Start 🚀

### Option 1: Using the Terminal (Recommended)
1. Open your terminal (PowerShell or Command Prompt).
2. Navigate to the project folder:
   ```powershell
   cd 'C:\Users\offic\OneDrive\Desktop\weather 2'
   ```
3. Start the server:
   ```powershell
   python -m http.server 8000
   ```
4. Open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2: Live Server (VS Code)
1. Open the folder in VS Code.
2. Install the **Live Server** extension.
3. Click **"Go Live"** in the bottom status bar.

## Project Structure 📁
The project has been optimized to include only essential files:
```text
weather-app/
├── index.html   # HTML Structure & Semantic Tags
├── script.js    # Logic, API Integration & LocalStorage
├── sty.css      # Modern Gradient UI & Responsive Layout
└── README.md    # Documentation & Technical Guide
```

## Technical Configuration 🔧

### API Settings
The app is currently configured with a default API key. For personal use, you can update it in `script.js`:
```javascript
const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};
```

### Customization
- **Change Units:** In `script.js`, change `&units=metric` to `&units=imperial` for Fahrenheit.
- **Change UI Colors:** Edit the `--gradient` variables in `sty.css`.

## Troubleshooting 🔍
- **Location Denied:** If geolocation fails, ensure you have allowed location permissions in your browser.
- **City Not Found:** Double-check the spelling of the city name.
- **Network Error:** Ensure you have an active internet connection to reach the weather API.

---
**Maintained by:** Antigravity AI
**Data Source:** [OpenWeatherMap](https://openweathermap.org/)
**Icons:** [Font Awesome](https://fontawesome.com/)

