const CountryItem = ({ country, onSelect }) => (
  <li>
    {country.name.common}
    <button onClick={() => onSelect(country)}>show</button>
  </li>
);

export default CountryItem;
