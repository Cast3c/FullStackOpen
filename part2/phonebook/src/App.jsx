import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import FormNewPerson from './components/FormNewPerson'
import PersonsShow from './components/PersonsShow'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [newNotification, setNewNotification] = useState({
    message: null,
    type: null,
  })

  const addPerson = (event) => {
    event.preventDefault()
    // console.log(event)
    const personObject = {
      name: newName,
      number: newNumber,
    }
    // console.log(personObject)
    if (nameExists(personObject.name)) {
      if(window.confirm(nameExistsMessage(newName))){
        const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
        console.log(person)
        const updatedPerson = { ...person, number: newNumber }
        console.log(updatedPerson)
        
        personsService
          .update(person.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => (p.id !== person.id ? p : returnedPerson)))
            setTimeout(() => {
              setNewNotification(() => ({
                message: null,
                type: null,
              }))
            }, 5000)
          })
          .catch((error) => {
            if(error.response.status === 404) {
            setNewNotification(() => ({
              message: `Information of ${newName} has already been removed from server`,
              type: 'error',
            }));
            setPersons(persons.filter(p => p.id !== person.id))
            }else{
            setNewNotification(() => ({
              message: `An error occurred while updating ${newName}`,
              type: "error",
            }))
            }
            setTimeout(() => {
              setNewNotification(() => ({
                message: null,
                type: null,
              }))
            }, 5000)
          })
      }
      setNewName('')
      setNewNumber('')
      setNewNotification(() => ({
        message: `The number of ${newName} has been updated`,
        type: 'success',
      }))
      setTimeout(() => {
        setNewNotification(() => ({
          message: null,
          type: null,
        }))
      }, 5000)
    }else{
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewNotification(() => ({
            message: `The number of ${newName} has been added to the phonebook`,
            type: 'success',
          }))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNewNotification(() => ({
              message: null,
              type: null,
            }))
          }, 5000)
        })
        .catch(error =>{
          console.log(error.response.data.error)
          setNewNotification(() => ({
            message: error.response.data.error,
            type: 'error',
          }))
          setTimeout(() => {
            setNewNotification(() => ({
              message: null,
              type: null,
            }))
          }, 5000)
        })      
    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    // console.log(event.target.value)
    setSearchTerm(event.target.value)
  }
  
  const nameExists = (name) => {
    return persons.some(person => person.name.toLowerCase() === name.toLowerCase())
  }

  const nameExistsMessage = (name) => {
    return `${name} is already added to phonebook, do you want to edit the phone number? `
  } 
  
  const personsToShow = searchTerm 
    ? persons.filter(person => 
      person.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : persons

  const handleDelete = (id) => {
    console.log(id)
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      personsService
        .dltPerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification.message} type={newNotification.type} />
      <Filter findPerson={searchTerm} handleFindPerson={handleSearchChange} />
      <h2>Add a new</h2>
      <FormNewPerson addPer={addPerson} newNam={newName} handleNewNam={handleNameChange} newPhon={newNumber} handleNewPhon={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonsShow persons={personsToShow} dltBtn={handleDelete} />
    </div>
  )
}

export default App
