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

export default { getAll, saveAnecdote }
