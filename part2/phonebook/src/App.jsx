import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const URL_DATA = "http://localhost:3001/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const hook = () => {
    axios.get(URL_DATA).then((response) => {
      setPersons(response.data);
    });
  };

  const create = () => {
    axios.post(URL_DATA, {
      name: newName,
      number: newNumber,
    }).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
  }

  useEffect(hook, []);

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
    create();
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
