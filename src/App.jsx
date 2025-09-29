
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorMessage from './components/ErrorMessage';
import { fetchWeatherByCity } from './services/weatherService';
import { fetchForecastByCity } from './services/forecastService';
import ForecastDisplay from './components/ForecastDisplay';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load last searched city from localStorage on mount
  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      setCity(lastCity);
    }
  }, []);

  // Clear weather data if input is cleared
  const handleCityChange = (value) => {
    setCity(value);
    if (value.trim() === '') {
      setWeather(null);
      setForecast(null);
      setError('');
    }
  };

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeather(null);
    setForecast(null);
    // Save last searched city to localStorage
    localStorage.setItem('lastCity', city);
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecastByCity(city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message || 'Error fetching weather');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <SearchBar value={city} onChange={handleCityChange} onSearch={handleSearch} />
      {loading && <LoadingIndicator />}
      {error && <ErrorMessage message={error} />}
      <div className="main-content main-content-column">
        <WeatherDisplay weather={weather} />
        <div className="forecast-side">
          <ForecastDisplay forecast={forecast} />
        </div>
      </div>
    </div>
  );
}

export default App;
