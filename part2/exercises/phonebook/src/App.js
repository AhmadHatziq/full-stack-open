import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  // Used to handle the event when the input name text field is changed. 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Used to process input when the button is clicked. 
  const handleClick = (event) => {
    event.preventDefault()

    // Extract input text data and creaate the new person. 
    const inputName = newName
    const newPerson = {name: inputName}

    // Clear input field 
    setNewName('')

    // Check if the person exists in the array. 
    const arrayContainsPerson = persons.some(person => person.name === inputName)
    
    if (arrayContainsPerson === true) {
      alert(`${inputName} is already added to phonebook`)
    } else {
      console.log(`Added person ${inputName} into the array`)
      setPersons(persons.concat(newPerson))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <form>
        <div>
          name: <input value={newName}
                  onChange={handleNameChange}  
                />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} </p> )}

    </div>
  )
}

export default App