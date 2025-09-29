// src/services/forecastService.js

const API_KEY = '1594d1a7a0b31ed4174aa1624f21c4d3'; // Use your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export async function fetchForecastByCity(city) {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'City not found');
  }
  return data;
}
