import { useState, useEffect } from "react";
import countriesService from "./services/countries";

const MAX_RESULTS = 10;

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await countriesService.getAllCountries();
      setCountries(data);
    } catch (err) {
      setError("Error loading countries");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderUnicountry = (country) => {
    return (<h1>{country.name.common}</h1>)
  }

  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const renderResults = () => {
    if (filteredCountries.length === 0) {
      return <p>No countries found</p>;
    }
    if (filteredCountries.length > MAX_RESULTS) {
      return <p>Too many results, specify another filter</p>;
    }

    if (filteredCountries.length === 1) {
      return renderUnicountry(filteredCountries[0]);
    }
    return (
      <ul>
        {filteredCountries.map((c) => (
          <li key={c.cca3}>{c.name.common}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div>
        <label>find countries: </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type the name of a country..."
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && renderResults()}
    </div>
  );
};

export default App;
