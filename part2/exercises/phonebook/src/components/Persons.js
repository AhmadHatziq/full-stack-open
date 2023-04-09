import personService from '../services/persons'

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

export default Persons