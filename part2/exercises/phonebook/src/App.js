import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')

  // Retrieve the JSON data and set the persons array. 
  useEffect( () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data )
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} notificationColor={notificationColor}/>
      <Filter
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        persons={persons} setPersons={setPersons}
      />

      <h2>add a new</h2>
      <PersonForm 
        newName={newName} setNewName={setNewName} 
        newPhoneNumber={newPhoneNumber} setNewPhoneNumber={setNewPhoneNumber}
        persons={persons} setPersons={setPersons}
        setNotificationMessage={setNotificationMessage} setNotificationColor={setNotificationColor}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App