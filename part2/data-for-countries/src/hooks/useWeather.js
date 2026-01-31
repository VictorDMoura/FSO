import { useState, useCallback } from "react";
import temperatureService from "../services/temperature";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState({ weather: null, icon: null });

  const fetchWeather = useCallback(async (capital) => {
    try {
      const data = await temperatureService.getTemperatureByCity(capital);
      const iconCode = data.weather?.[0]?.icon;
      const iconUrl = iconCode
        ? temperatureService.getIconUrl(iconCode)
        : null;

      setWeatherData({ weather: data, icon: iconUrl });
    } catch (err) {
      console.error("Error loading weather data", err);
      setWeatherData({ weather: null, icon: null });
    }
  }, []);

  const reset = useCallback(() => {
    setWeatherData({ weather: null, icon: null });
  }, []);

  return { ...weatherData, fetchWeather, reset };
};

export default useWeather;
