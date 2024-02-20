import { useContext, useEffect, useState } from "react";
import { LocationContext } from "./LocationContext";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const locations = useContext(LocationContext);
  const [AddMore, setAddMore] = useState(false);

  const AddLocation = () => {
    setAddMore(!AddMore);
  };

  useEffect(() => {
    if (!selectedLocation) return;

    const fetchWeatherLocation = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=d1d84064155b43658fb80259241902&q=${selectedLocation}&days=4&aqi=no&alerts=no`
        );
        const Weatherdata = response.data.forecast.forecastday;
        console.log(response.data);

        setWeatherData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWeatherLocation();
  }, [selectedLocation]);

  useEffect(() => {
    if (locations !== undefined) {
      setIsLoading(false);
    }
  }, [locations]);

  return (
    <div className="container">
      <div className="location-select">
        <h2>Select a location:</h2>
      </div>

      <button onClick={AddLocation}>
        {AddMore ? "Add-More" : "Add-Location"}
      </button>

      {AddMore && (
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          {
            locations.map((i) => (
              <option value={i.city}>{i.city}</option>
            ))
          }
        </select>
      )}

      <div className="weather-Details">
        {weatherData &&
          weatherData.forecast.forecastday.map((dayData, index) => (
            <WeatherCard
              key={index}
              day={dayData.day.condition.text}
              date={dayData.date}
              temperature={dayData.day.avgtemp_c}
              description={dayData.day.condition.text}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
