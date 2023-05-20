import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Custom hook used for an input field. 
// Eg type == 'text' 
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// Country component, which renders details regarding a single country. 
// Will handle the case when a country is not found. 
const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

// Custom hook used to search for a given country name. 
// The returned 'country' will be rendered in the 'Country' component 
// Eg name == 'finland' 
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    
    console.log("Country name submitted: ", name)
    const countryUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`

    // Do an axios call to the API endpoint 
    axios
      .get(countryUrl)
      .then(response => {
        
        // Only process if there is only 1 result returned 
        if (response.data.length === 1) {
          const countryData = response.data[0]
          
          // Obtain the country details and store them in a newCountry object 
          const newCountry = {
            "found": true , 
            data: {
              "name": countryData.name.common, 
              "capital": countryData.capital, 
              "population": countryData.population, 
              "flag": countryData.flags.png
            }
          }

          setCountry(newCountry)
        }

      })
      .catch(error => {
        console.log(error)
        setCountry({"found": false})
      })

  }, [name])

  return country
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  // When the form is triggered, setName is called, which changes the value of 'name', and cascades to 'country'
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App