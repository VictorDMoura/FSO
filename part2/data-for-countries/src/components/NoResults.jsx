const NoResults = ({ count }) => {
  if (count === 0) return <p>No countries found</p>;
  return <p>Too many results, specify another filter</p>;
};

export default NoResults;
