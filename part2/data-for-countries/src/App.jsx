import { useState, useEffect, useCallback } from "react";
import countriesService from "./services/countries";
import SearchInput from "./components/SearchInput";
import CountriesList from "./components/CountriesList";
import CountryDetail from "./components/CountryDetail";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import NoResults from "./components/NoResults";

const MAX_RESULTS = 10;

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchData = useCallback(
    async (fetchFn, errorMsg) => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFn();
        setCountries(data);
        setSelectedCountry(null);
      } catch (err) {
        setError(errorMsg);
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchCountries = useCallback(
    () => fetchData(() => countriesService.getAllCountries(), "Error loading countries"),
    [fetchData]
  );

  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  const renderResults = () => {
    if (filteredCountries.length === 0) {
      return <NoResults count={0} />;
    }
    if (filteredCountries.length > MAX_RESULTS) {
      return <NoResults count={filteredCountries.length} />;
    }

    if (filteredCountries.length === 1) {
      return <CountryDetail country={filteredCountries[0]} />;
    }

    return (
      <CountriesList
        countries={filteredCountries}
        onSelect={setSelectedCountry}
      />
    );
  };

  return (
    <div>
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />

      {selectedCountry && (
        <button onClick={() => setSelectedCountry(null)}>Back</button>
      )}
      {selectedCountry && <CountryDetail country={selectedCountry} />}

      {!selectedCountry && loading && <LoadingSpinner />}
      {!selectedCountry && error && (
        <ErrorMessage message={error} />
      )}
      {!selectedCountry && !loading && renderResults()}
    </div>
  );
};

export default App;
