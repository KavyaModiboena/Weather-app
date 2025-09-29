// src/services/weatherService.js

const API_KEY = '1594d1a7a0b31ed4174aa1624f21c4d3'; // User's actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeatherByCity(city) {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('API response:', data); // Debug log
    if (!response.ok) {
      throw new Error(data.message || 'City not found');
    }
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}
