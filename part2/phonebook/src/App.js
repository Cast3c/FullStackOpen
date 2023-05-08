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
    const person = persons.find((obj) => obj.name.toLowerCase() === newName.toLowerCase());
    if (person) {
      const msg = window.confirm(`${newName} is already added to phonebook, do you want to edit the contact number`);
      if (msg) {
        console.log('checking the pass');
        const updtContact = {...person, number: newContact.number}

        personService
        .update(updtContact.id, updtContact)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== updtContact.id ? person : returnedPerson));
          setNewName("");
          setNewPhone("");
          setFindPerson("");
        })
      }
    } else {
      personService
      .create(newContact)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
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

  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const personId = persons.findIndex((p) => p.id === id);
    console.log(id);
    if (personId !== -1) {
      const msg =  window.confirm(
        `Delete ${person.name}? `
       )

      if (msg === true ) {
        personService
        .erase(id)
        .then((returnedPerson)=>{
          setPersons(persons.filter(name=> name.id !== id))
        })
      }
    }
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
      <ul>
        {namesToShow.map((name) => (
          <Persons 
            key={name.id}
            namesToShow={name}
            deletePerson={() => handleDeletePerson(name.id)}
          />
        ))}
      </ul>
      
    </div>
  );
};

export default App;
