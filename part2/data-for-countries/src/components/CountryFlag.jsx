const CountryFlag = ({ flag, countryName }) => (
  <img
    src={flag}
    alt={`Flag of ${countryName}`}
    width="150"
  />
);

export default CountryFlag;
