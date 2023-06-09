import { useState } from 'react'

const Button = ({buttonLabel, buttonHandler}) => {
  return (
    <button onClick={buttonHandler}>
      {buttonLabel} 
    </button>
  )
}

const MostVotes = ({anecdotes, voteCounts}) => {

  // Get the index with the most votes 
  const maxVotes = Math.max(...voteCounts)
  const maxIndex = voteCounts.indexOf(maxVotes)

  // Displays the anecdote with the most votes 
  return(<p>{anecdotes[maxIndex]}</p>)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // voteCounts is initialized to be an array of '0's, of the same length as anecdotes array. 
  const [voteCounts, setVoteCounts] = useState(new Uint8Array(anecdotes.length))
   
  const [selected, setSelected] = useState(0)

  // Function for the "next anecdote" button. 
  const nextAnecdote = () => {

    // Generate a random integer from 0 to size of anecdotes 
    const random_index = Math.floor(Math.random() * anecdotes.length) 

    // Set the 'selected' value 
    setSelected(random_index)

    // Log the random index. Note that the 2 values do not match due to asynchronousity. 
    console.log('Random index: ', random_index)
    console.log('Selected index: ', selected)

  }

  // Increment the votecount for the selected anecdote 
  const voteAnecdote = () => {

    // Updating the state must be done on a copy of the array. 
    const updatedCounts = [...voteCounts] // Use the spread operator to copy the whole array over. 
    updatedCounts[selected] += 1 
    setVoteCounts(updatedCounts) // Update the state using the copy of the array. 
    
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}

      <br/><br/>

      has {voteCounts[selected]} votes 

      <br/><br/>

      <Button buttonLabel="vote" buttonHandler={voteAnecdote}/>

      <br/><br/>

      <Button buttonLabel="next anecdote" buttonHandler={nextAnecdote}/>

      <br/><br/>

      <h1>Anecdote with the most votes</h1>

      <br/>

      <MostVotes anecdotes={anecdotes} voteCounts={voteCounts}/>

      <br/><br/>

      has {voteCounts[selected]} votes 

    </div>
  )
}

export default App