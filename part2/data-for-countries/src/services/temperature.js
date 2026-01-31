import axios from "axios";
const api_key = import.meta.env.VITE_SOME_KEY;

const URL_TEMPERATURE = `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apikey}&units=metric`;
const URL_ICON = `http://openweathermap.org/img/wn/10n@2x.png`;

const getTemperatureByCity = (city) => {
  const request = axios.get(
    URL_TEMPERATURE.replace("{city}", city).replace("{apikey}", api_key)
  );
  return request.then((response) => response.data);
};

const getIconUrl = (iconCode) => {
  return URL_ICON.replace("10n", iconCode);
};

export default { getTemperatureByCity, getIconUrl };