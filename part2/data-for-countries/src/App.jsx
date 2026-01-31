import { useState, useEffect, useCallback } from "react";
import countriesService from "./services/countries";
import useWeather from "./hooks/useWeather";
import SearchInput from "./components/SearchInput";
import CountriesList from "./components/CountriesList";
import CountryDetail from "./components/CountryDetail";
import BackButton from "./components/BackButton";
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
  const { weather, icon, fetchWeather, reset: resetWeather } = useWeather();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchData = useCallback(async (fetchFn, errorMsg) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFn();
      setCountries(data);
      setSelectedCountry(null);
      resetWeather();
    } catch (err) {
      setError(errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [resetWeather]);

  const fetchCountries = useCallback(
    () =>
      fetchData(
        () => countriesService.getAllCountries(),
        "Error loading countries",
      ),
    [fetchData],
  );

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  useEffect(() => {
    if (selectedCountry && selectedCountry.capital) {
      fetchWeather(selectedCountry.capital[0]);
    }
  }, [selectedCountry, fetchWeather]);

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
      return <CountryDetail country={filteredCountries[0]} weather={weather} />;
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
        <>
          <BackButton onClick={() => setSelectedCountry(null)} />
          <CountryDetail
            country={selectedCountry}
            weather={weather}
            icon={icon}
          />
        </>
      )}

      {!selectedCountry && loading && <LoadingSpinner />}
      {!selectedCountry && error && <ErrorMessage message={error} />}
      {!selectedCountry && !loading && renderResults()}
    </div>
  );
};

export default App;
