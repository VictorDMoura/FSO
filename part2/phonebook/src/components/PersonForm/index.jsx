const PersonForm = ({
  onSubmit,
  nameValue,
  numberValue,
  onNameChange,
  onNumberChange,
}) => (
  <form onSubmit={onSubmit}>
    <h2>Add a new</h2>
    <div>
      name: <input value={nameValue} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={numberValue} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
