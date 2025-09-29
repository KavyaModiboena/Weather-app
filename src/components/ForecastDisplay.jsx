import React from 'react';

// Helper to group forecast by day
function groupByDay(list) {
  const days = {};
  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  return days;
}

const ForecastDisplay = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;
  const days = groupByDay(forecast.list);
  const dayKeys = Object.keys(days).slice(0, 5); // Only 5 days

  return (
    <div className="forecast-display">
      <h3>5-Day Forecast</h3>
      <div className="forecast-days-grid">
        {dayKeys.map((date, idx) => {
          const midday = days[date].find(item => item.dt_txt.includes('12:00:00')) || days[date][0];
          return (
            <div key={date} className="forecast-day">
              <div>{new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
              <div>🌡️ {midday.main.temp}°C</div>
              <div>☁️ {midday.weather[0].main}</div>
              <div>💧 {midday.main.humidity}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastDisplay;
