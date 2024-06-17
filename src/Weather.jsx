import React, { useState } from "react";
import "./Weather.css";
// import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
// import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
const Weather = () => {
  const api = {
    key: "41f6eff1f0a559398c43a377bbffd53e",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (event) => {
    try {
      event.preventDefault();
      // console.log(query);

      const data = await fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
      );
      const result = await data.json();
      console.log(result);
      if (result.cod === 200) {
        setWeather(result);
      } else {
        throw new Error("City Not Found!");
      }
      // console.log(weather);
    } catch (e) {
      alert(e.message);
    } finally {
      setQuery("");
    }
  };

  const DateBuilder = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[d.getDay()];
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day},${month},${year}`;
  };

  const weatherBkd = (e) => {
    if (e.weather !== "undefined") {
      if (e.weather[0].main === "Clouds") return "app-cloud";
      else if (e.weather[0].main === "Haze") return "app-haze";
      else if (e.weather[0].main === "Rainy") return "app-rainy";
      else if (e.weather[0].main === "Clear") return "app-clear";
      else return "app-winter";
    } else return "app";
  };

  return (
    <div className={weatherBkd(weather)}>
      <main>
        <div className="search-box">
          <form onSubmit={search}>
            <input
              type="text"
              placeholder="Search...."
              className="search-bar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="button">
              <label>
                <button type="submit" class="btn btn-success" id="button">
                  Search
                </button>
              </label>
            </div>
          </form>
        </div>
        <div className="box">
          <div className="location-box">
            <div className="location">
              {weather.name && weather.sys
                ? `${weather.name}, ${weather.sys.country}`
                : "Type your city name"}
            </div>
            <div className="date">{DateBuilder(new Date())}</div>
            <div className="temperature-box">
              <div className="temp">
                {weather.main ? Math.round(weather.main.temp) : "0"}°C
              </div>
              <div className="weather-type">
                {weather.weather && weather.weather[0].main}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Weather;
