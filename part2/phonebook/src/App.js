import React, { useState, useEffect } from "react";
import personService from "./components/services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [showName, setShowName] = useState(true);
  const [findPerson, setFindPerson] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
      number: newPhone,
    };
    const person = persons.find((obj) => obj.name === newName);
    if (person) {
      alert(`${newName} is already added to phonebook`);
    } else {
      personService.create(newContact).then((returnedPerson) => {
        setPersons(persons.concat(newContact));
        setNewName("");
        setNewPhone("");
        setFindPerson("");
        setShowName(true);
      });
    }
  };

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNewPhone = (event) => {
    console.log(event.target.value);
    setNewPhone(event.target.value);
  };

  const handleFindPerson = (event) => {
    console.log(event.target.value);
    setFindPerson(event.target.value);
    setShowName(false);
  };

  const namesToShow = showName
    ? persons
    : persons.filter((name) =>
        name.name.toLowerCase().includes(findPerson.toLowerCase())
      );

  //

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter findPerson={findPerson} handleFindPerson={handleFindPerson} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNewName={handleNewName}
        newName={newName}
        newPhone={newPhone}
        handleNewPhone={handleNewPhone}
      />
      {/* <div>
        bug: {newName}
      </div> */}
      <h2>Contacts</h2>
      <Persons namesToShow={namesToShow} />
    </div>
  );
};

export default App;
