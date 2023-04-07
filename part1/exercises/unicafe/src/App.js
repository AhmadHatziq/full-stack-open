import { useState } from 'react'

const ButtonComponent = ({button_label, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {button_label} 
    </button>
  )
}

const DisplayComponent = ({display_label, value}) => {

  return (
    <p>
      {display_label} {value}
    </p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <ButtonComponent button_label="good" handleClick={() => setGood(good + 1)}/>
      <ButtonComponent button_label="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <ButtonComponent button_label="bad" handleClick={() => setBad(bad + 1)}/>
      

      <h1>statistics</h1>

      <DisplayComponent display_label="good" value={good}/>
      <DisplayComponent display_label="neutral" value={neutral}/>
      <DisplayComponent display_label="bad" value={bad}/>

    </div>
  )
}

export default App