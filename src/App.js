import React, { useState } from 'react';
import './index.css';
const api = {
  key: "85dc15db2afc0a9696ba9dfb5855c7b9",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          console.log(result);
        });
    }
  }
  const dateBuilder = (d) => {
    let months = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"];
    let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined")
        ? ((weather.main.temp > 23)
          ? 'app warm'
          : 'app')
        : 'app'
    }>
      <main>
        <div className='search-box'>
          <input
            type='text' className='search-bar'
            placeholder='search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              {/* <div className='location'>{weather.name}, {weather}</div> */}
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {weather.name} {weather.main.temp}°c
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
