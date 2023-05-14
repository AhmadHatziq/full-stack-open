import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// Used to obtain all anecdotes
export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

// Used to create a new anecdote 
export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

// Used to update an anecdote 
export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)

// Used to upvote a new anecdote  
export const upvoteAnecdote = async (anecdoteId) => {

  const anecdoteUrl = `${baseUrl}/${anecdoteId}`

  // Get the current vote count 
  const currentAnecdote = (await axios.get(anecdoteUrl)).data 
  const currentVotes = parseInt(currentAnecdote.votes)

  // Create a new anecdote, with the incremented vote count 
  const newAnecdote = {...currentAnecdote, 'votes': currentVotes + 1}

  // Update the new anecdote to the backend 
  const response = await axios.put(anecdoteUrl, newAnecdote)
  return response.data 

}
