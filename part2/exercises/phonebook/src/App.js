import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 'number': '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      
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
      {persons.map(person => <p key={person.name}>{person.name} {person.number} </p> )}

    </div>
  )
}

export default App