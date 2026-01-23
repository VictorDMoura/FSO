import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  };

  const create = () => {
    personService
      .create({
        name: newName,
        number: newNumber,
      })
      .then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
      });
  };

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;

    personService.deletePerson(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    }).catch(() => {
      setErrorMessage(`Information of ${name} has already been removed from server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  const handleUpdate = (id, updatedPerson) => {
    personService.update(id, updatedPerson).then((returnedPerson) => {
      setPersons(
        persons.map((person) => (person.id !== id ? person : returnedPerson)),
      );
    });
  };

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
      const personToUpdate = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase(),
      );
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        handleUpdate(personToUpdate.id, {
          ...personToUpdate,
          number: newNumber,
        });
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    setPersons(persons.concat(newPerson));
    create();
    setMessageSuccess(`Added ${newName}`);
    setTimeout(() => {
      setMessageSuccess(null);
    }, 5000);
    setNewName("");
    setNewNumber("");
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value.toLowerCase();
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter),
    );

    if (filter === "") {
      personService.getAll().then((data) => {
        setPersons(data);
      });
      return;
    }
    setPersons(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={messageSuccess} type="success" />
      <Notification message={errorMessage} type="error" />

      <Filter handleFilterChange={handleFilterChange} />

      <PersonForm
        onSubmit={handleSubmit}
        nameValue={newName}
        numberValue={newNumber}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
