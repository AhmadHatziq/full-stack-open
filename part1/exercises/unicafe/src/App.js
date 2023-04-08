import { useState } from 'react'

const ButtonComponent = ({button_label, value, setValue}) => {

  // Define event handler function for button click. 
  const clickFunction = () => {
    setValue(value + 1)
  }

  return (
    <button onClick={clickFunction}>
      {button_label} 
    </button>
  )
}

// Returns a '%' for the 'positive' label
const DisplayComponent = ({display_label, value}) => {
  if (display_label === 'positive') return  <p>{display_label} {value} %</p>
  return <p>{display_label} {value}</p>
  
}

// Calculates & displays the statistics
const Statistics = ({good, neutral, bad}) => {

    // Calculate the toal, average and positive values 
    let total = good + neutral + bad 
    let average = (good - bad * 1.0) / (1.0 * total)
    let positive = good / total * 100.0

    // Display the string "No feedback given" if total is 0 ie there is no feedback given. 
    if (parseInt(total) === 0) return <p>No feedback given</p>

    return(
      <>
        <DisplayComponent display_label="good" value={good}/>
        <DisplayComponent display_label="neutral" value={neutral}/>
        <DisplayComponent display_label="bad" value={bad}/>
        <DisplayComponent display_label="all" value={total}/>
        <DisplayComponent display_label="average" value={average}/>
        <DisplayComponent display_label="positive" value={positive} />
      </>
    )


}; 

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>give feedback</h1>
      <ButtonComponent button_label="good" value={good} setValue={setGood}/>
      <ButtonComponent button_label="neutral" value={neutral} setValue={setNeutral}/>
      <ButtonComponent button_label="bad" value={bad} setValue={setBad}/>
      
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App