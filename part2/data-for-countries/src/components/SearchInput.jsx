const SearchInput = ({ value, onChange }) => (
  <div>
    <label>find countries: </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Type the name of a country..."
    />
  </div>
);

export default SearchInput;
