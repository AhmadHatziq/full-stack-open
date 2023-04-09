import personService from '../services/persons'

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
      
      // If the person exists, overwrite the number only. 
      // If the person does not exist, create & add a new person. 
      if (arrayContainsPerson === true) {
  
        const message = `${inputName} is already added to phonebook, replace the old number with a new one?`
        if (window.confirm(message) === true) {
  
          // Create the new person object 
          const matchingPerson = persons.find(person => person.name === inputName)
          const updatedPerson = {...matchingPerson, number: newNumber}
  
          // Update the backend & frontend 
          personService
            .update(updatedPerson.id, updatedPerson)
            .then(response => {
              setPersons(persons.map(person => person.name !== inputName ? person : response.data))
              console.log(`Updated ${inputName} with new number`)
            })
  
        }
        return
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

export default PersonForm