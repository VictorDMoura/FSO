

const CountryCapitalWeather = ({ capital, weather, icon }) => {
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather?.main?.temp ?? "N/A"} °C</p>
      <img src={icon} alt="Weather icon" />
      <p>
        Wind: {weather?.wind?.speed ?? "N/A"} m/s
        {weather?.wind?.deg && ` direction ${weather.wind.deg}°`}
      </p>
    </div>
  );
};

export default CountryCapitalWeather;