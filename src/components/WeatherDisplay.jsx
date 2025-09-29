import React from 'react';

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;
  return (
    <div className="weather-display">
      <h2>{weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].main}</p>
      <p>Humidity: {weather.main.humidity}%</p>
    </div>
  );
};

export default WeatherDisplay;
