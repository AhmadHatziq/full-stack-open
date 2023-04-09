import { useState, useEffect } from 'react'
import personService from './services/persons'

// Renders a single person's name & telephone number. 
const SinglePerson = ({person, setPersons, persons}) => {

  const deletePerson = (personToDelete) => {
    
    // Show confirmation box. 
    // Return if the user does not want to delete. 
    if (window.confirm(`Delete ${personToDelete.name} ?`) === false) {
      console.log(`User does not want to delete ${personToDelete.name}`)
      return 
    }
    
    // Proceed to delete the person. 
    personService
      .remove(personToDelete.id)
      .then(response => {

        // Remove deleted person from local array
        setPersons(persons.filter(eachPerson => eachPerson.id !== personToDelete.id))
        
        console.log(`Deleted person status: ${response.status}`)
      })
  }

  return(
    <>
      <p>{person.name} {person.number} </p>
      <button onClick={() => deletePerson(person)}>delete</button>
    </>
  )

}

// Renders all people from the phonebook. 
const Persons = ({setPersons, persons}) => {
  return (
    <>
      {persons
        .filter(person => person.toShow === true)
        .map(person => <SinglePerson person={person} key={person.name}
                                     persons={persons} setPersons={setPersons}/>)
      }
    </>
  )
}

// Renders the form
const PersonForm = ({persons, setPersons, newName, setNewName, newPhoneNumber, setNewPhoneNumber}) => {

  // Used to handle the event when the input name text field is changed. 
  const handleInputChange = (event, setterFunction) => {
    setterFunction(event.target.value)
  }

  // Used to process input fields when the button is clicked. 
  const handleClick = (event) => {
    event.preventDefault()

    // Extract input name & phone number. 
    const inputName = newName
    const newNumber = newPhoneNumber

    // Get the largest id present. 
    const maxId = persons.reduce((max, item) => Math.max(max, item.id), -Infinity)

    // Check if the person exists in the array. 
    const arrayContainsPerson = persons.some(person => person.name === inputName)
    
    // Add only if the name is not in the phonebook. 
    if (arrayContainsPerson === true) {
      alert(`${inputName} is already added to phonebook`)
    } else {

      // Create new person object 
      const newPerson = {name: inputName, 'number': newNumber, toShow: true, id: maxId+1}

      // Do a POST to store the new object in the backend. 
      // If successful, store the value in the local array. Update the state & re-render. 
      personService
        .create(newPerson)
        .then(response => {

          // Update persons array 
          setPersons(persons.concat(response.data))

          // Clear input fields 
          setNewName('')
          setNewPhoneNumber('')

          // Log the newly created person and number. 
          console.log(`Added person ${response.data.name} with no: ${response.data.number} into the array`)
        })
    }
  }

  return(
    <>
      <form>
        <div>
          name: <input value={newName} onChange={(event) => handleInputChange(event, setNewName)}/>
          number: <input value={newPhoneNumber} onChange={(event) => handleInputChange(event, setNewPhoneNumber)}/>     
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
    </>
  )
}

const Filter = ({searchTerm, setSearchTerm, persons, setPersons}) => {
  
  // Handles the searching of names based on the input field. 
  const handleSearching = (event) => {
    
    // Prevent default behaviour and set the searchTerm 
    event.preventDefault()
    setSearchTerm(event.target.value)
    const searchTermValue = (event.target.value).toLowerCase() 
    
    // If the searchTerm is similar to the name, mark toShow as true. Else, mark as false. 
    // Need to create a new array and Person with the spread operator (...)
    let currentPersons = [...persons] 
    for (let i = 0; i < currentPersons.length; i++){
      if (currentPersons[i].name.toLowerCase().includes(searchTermValue)) {
        currentPersons[i] = { ...currentPersons[i], toShow: true}; 
        // console.log(currentPersons[i].name, "true")
      } else {
        currentPersons[i] = { ...currentPersons[i], toShow: false}; 
        // console.log(currentPersons[i].name, "false")
      }
    }

    // Save the state back to the updated persons array 
    setPersons(currentPersons)
  } // end of handleSearching anonymous function. 

  return(
    <div>
        filter shown with <input value={searchTerm} onChange={(event) => handleSearching(event)}></input>
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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
      <Filter
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        persons={persons} setPersons={setPersons}
      />

      <h2>add a new</h2>
      <PersonForm 
        newName={newName} setNewName={setNewName} 
        newPhoneNumber={newPhoneNumber} setNewPhoneNumber={setNewPhoneNumber}
        persons={persons} setPersons={setPersons}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App