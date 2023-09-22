import { useState } from "react";
import "./App.css";
const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
    setCityName(city);
  };

  async function getWeather() {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial`
      );
      const data = await res.json();
      setWeather(data?.weather[0]?.main);
      setTemp(data?.main?.temp);
    } catch (err) {
      setError(`Can't get information about ${city}`);
    }
  }

  return (
    <>
      <div className="card-body">
        <div className="card">
          <div className="card-title">
            <h3>Weather Information</h3>
          </div>
          <div className="card-info">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button>Get Weather Info</button>
            </form>
          </div>
          <div className="weather-info">
            {weather && (
              <h4>
                {cityName + " -"} {temp + " ℃"} {weather}
              </h4>
            )}
            {error && <h4>{error}</h4>}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
