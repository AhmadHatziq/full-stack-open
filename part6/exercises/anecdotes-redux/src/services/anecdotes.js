import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// GET request to the backend to retrieve all the anecdotes. 
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// POST request to send a new anecdote to the backend. 
const saveAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data 
}

// POST request to upvote a new anecdote to the backend. 
const upvoteAnecdote = async (anecdoteId) => {
  const anecdoteUrl = `${baseUrl}/${anecdoteId}`

  // Get the current vote count from the backend 
  const currentAnecdote = (await axios.get(anecdoteUrl)).data
  const currentVotes = parseInt(currentAnecdote.votes)
  console.log(currentVotes)

  // Create a new anecdote, with the incremented votes 
  const newAnecdote = {...currentAnecdote, 'votes': currentVotes + 1}
  
  // PUT the newAnecdote 
  const response = await axios.put(anecdoteUrl, newAnecdote)
  return response.data

}


export default { getAll, saveAnecdote, upvoteAnecdote }
