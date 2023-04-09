
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

export default Filter; 