import './App.css'
import { useState, useEffect } from 'react' 
import axios from 'axios'

const endpoint = 'https://restcountries.com/v3.1/all?fields=name&fields=flag&fields=capital&fields=area&fields=languages&fields=flags'

// Displays the search results of matching countries 
const RenderCountries = ({countriesToRender}) => {

    if (countriesToRender.length === 0) {
      return (
        <p>No results found</p>
      )
    }

    // If there are more than 10 countries, show 'Too many matches, specify another filter'
    if (countriesToRender.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    } 

    // If there are ten or fewer matching countries, show the list 
    if (countriesToRender.length > 1 && countriesToRender.length <= 10) {
      return (
        <>
          {countriesToRender.map(item => <p key={item.name.common}>{item.name.common}</p>)}
        </>
      )
    } 

    // If there is only one matching country, show the capital, area, langauges & flag 
    if (countriesToRender.length === 1) {
      const singleCountry = countriesToRender[0]
      const languages = Object.values(singleCountry.languages)
      return(
        <>
          <h1>{singleCountry.name.common}</h1>
          <p>capital {singleCountry.capital}</p>
          <p>area {singleCountry.area}</p>
          <h2>languages:</h2>
          <ul>
            {languages.map(item => <li key={item}>{item}</li>)}
          </ul>
          <img src={singleCountry.flags.png}/>
        </>
      )
    }
}

// Component for the text search field. 
const CountrySearch = ({searchCountry, setSearchCountry, countries, setCountriesToRender}) => {

  // To handle the input field changing. 
  const handleInputChange = (event) => {
    setSearchCountry(event.target.value)

    // Search and find matching countries
    const searchTerm = searchCountry.toLowerCase().replace(/\s/g, '')
    const matchingCountries = countries.filter(item => {
      return (
        item.name.common.toLowerCase().replace(/\s/g, '').includes(searchTerm) || 
        item.name.official.toLowerCase().replace(/\s/g, '').includes(searchTerm) || 
        (JSON.stringify(item.name.nativeName)).replace(/\s/g, '').includes(searchTerm)
      )
    })

    // console.log(searchTerm)
    // console.log(matchingCountries)

    // Pass the array of countries to RenderCountries component. 
    setCountriesToRender(matchingCountries)
  }

  return (
    <div className="search-container">
      <p>find countries</p> 
      <input 
        value={searchCountry} 
        onChange={(event) => handleInputChange(event)} 
        type="text">
        </input>
    </div>
  )
}

function App() {
  const [searchCountry, setSearchCountry] = useState('')
  const [countries, setCountries] = useState([]) // Stores the full array
  const [countriesToRender, setCountriesToRender] = useState([])

  // Retrieve the JSON data from the backend server. 
  useEffect(() => {

    // Retrieve all the data
    axios
      .get(endpoint)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Hello countries</h1>
      <CountrySearch 
      searchCountry={searchCountry} 
      setSearchCountry={setSearchCountry}
      countries={countries}
      setCountriesToRender={setCountriesToRender}
      />
      <RenderCountries
        countriesToRender={countriesToRender}
      />
    </div>
  );
}

export default App;
