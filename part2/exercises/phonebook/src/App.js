import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1, toShow: true},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2, toShow: true},
    { name: 'Dan Abramov', number: '12-43-234345', id: 3, toShow: true},
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4, toShow: true}
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Used to handle the event when the input name text field is changed. 
  const handleInputChange = (event, setterFunction) => {
    setterFunction(event.target.value)
  }

  // Used to process input fields when the button is clicked. 
  const handleClick = (event) => {
    event.preventDefault()

    // Extract input text data and creaate the new person. 
    const inputName = newName
    

    // Check if the person exists in the array. 
    const arrayContainsPerson = persons.some(person => person.name === inputName)

    // Extract input phone number. 
    const newNumber = newPhoneNumber

    // Clear input fields 
    setNewName('')
    setNewPhoneNumber('')
    
    if (arrayContainsPerson === true) {
      alert(`${inputName} is already added to phonebook`)
    } else {
      // Store person & number into array
      const newPerson = {name: inputName, 'number': newNumber}
      console.log(`Added person ${newPerson.name} with no: ${newPerson.number} into the array`)
      setPersons(persons.concat(newPerson))
    }
  }

  // Handles the searching of names based on the input field. 
  const handleSearching = (event) => {
    
    // Prevent default behaviour and set the searchTerm 
    event.preventDefault()
    setSearchTerm(event.target.value)
    const searchTermValue = (event.target.value).toLowerCase() 
    
    // If the searchTerm is similar to the name, mark toShow as true. Else, mark as false. 

    // Note that the code below does not work as it is directly mutating the array copy. 
    /*
    let currentPersons = persons 
    for (let i = 0;i < currentPersons.length; i++){
      if (currentPersons[i].name.includes(searchTermValue)) {
        currentPersons[i].toShow = true
      } else {
        currentPersons[i].toShow = false
      }
    }
    */ 

    // Below is the working version. Need to create a new array and Person with the spread operator (...)
    let currentPersons = [...persons] 
    for (let i = 0; i < currentPersons.length; i++){
      if (currentPersons[i].name.toLowerCase().includes(searchTermValue)) {
        currentPersons[i] = { ...currentPersons[i], toShow: true}; 
        console.log(currentPersons[i].name, "true")
      } else {
        currentPersons[i] = { ...currentPersons[i], toShow: false}; 
        console.log(currentPersons[i].name, "false")
      }
    }

    // Save the state back to the updated persons array 
    setPersons(currentPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchTerm} onChange={(event) => handleSearching(event)}></input>
      </div>

      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(event) => handleInputChange(event, setNewName)}/>
          number: <input value={newPhoneNumber} onChange={(event) => handleInputChange(event, setNewPhoneNumber)}/>     
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons
        .filter(person => person.toShow === true)
        .map(person => <p key={person.name}>{person.name} {person.number} </p> )}

    </div>
  )
}

export default App