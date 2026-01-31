const CountryLanguages = ({ languages }) => {
  if (!languages) return <p>N/A</p>;

  return (
    <ul>
      {Object.values(languages).map((lang) => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
  );
};

export default CountryLanguages;
