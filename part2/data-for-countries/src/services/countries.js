import axios from "axios";

const URL = "https://studies.cs.helsinki.fi/restcountries/api/all";
const URL_COUNTRY = "https://studies.cs.helsinki.fi/restcountries/api/name/";

const getAllCountries = () => {
  const request = axios.get(URL);
  return request.then((response) => response.data);
};

const getCountryByName = (name) => {
  const request = axios.get(`${URL_COUNTRY}${name}`);
  return request.then((response) => response.data);
};

export default { getAllCountries, getCountryByName };
