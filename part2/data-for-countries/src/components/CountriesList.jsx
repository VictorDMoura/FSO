import CountryItem from "./CountryItem";

const CountriesList = ({ countries, onSelect }) => (
  <ul>
    {countries.map((c) => (
      <CountryItem key={c.cca3} country={c} onSelect={onSelect} />
    ))}
  </ul>
);

export default CountriesList;
