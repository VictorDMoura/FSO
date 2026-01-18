import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const PERSONS_DATA = [
  { name: "Arto Hellas", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
];



const App = () => {
  const [persons, setPersons] = useState(PERSONS_DATA);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const nameExists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(newPerson));
    PERSONS_DATA.push(newPerson);
    setNewName("");
    setNewNumber("");
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value.toLowerCase();
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter),
    );

    if (filter === "") {
      setPersons(PERSONS_DATA);
      return;
    }
    setPersons(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange} />

      <PersonForm
        onSubmit={handleSubmit}
        nameValue={newName}
        numberValue={newNumber}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
