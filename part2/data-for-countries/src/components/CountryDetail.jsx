import CountryLanguages from "./CountryLanguages";
import CountryFlag from "./CountryFlag";
import CountryCapitalWeather from "./CountryCapitalWeather";

const CountryDetail = ({ country, weather, icon }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital?.[0] ?? "N/A"}</p>
    <p>Area: {country.area}</p>
    <h3>Languages:</h3>
    <CountryLanguages languages={country.languages} />
    <CountryFlag flag={country.flags.png} countryName={country.name.common} />
    <CountryCapitalWeather capital={country.capital?.[0]} weather={weather} icon={icon} />
  </div>
);

export default CountryDetail;
