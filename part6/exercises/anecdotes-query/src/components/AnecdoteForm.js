import { useMutation, useQueryClient } from 'react-query' 
import { createAnecdote } from '../requests'

import { useContext } from 'react'
import { NotificationContext } from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const [notificationString, notificationStringDispatch] = useContext(NotificationContext)

  // Handles the mutation when a new anecdote is added by the user. 
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {

      // Invalidates the cache, which causes a re-render
      queryClient.invalidateQueries('anecdotes')

      // Set the notification message to inform the user of a successful anecdote creation 
      notificationStringDispatch({type: "DISPLAY", payload: `Created a new anecdote: ${newAnecdote.content}`})

      // Remove the notification message after 5 seconds 
      setTimeout(() => {
        notificationStringDispatch({type: "CLEAR"})
      }, 5 * 1000)
      
    },

    // Assume all failed POST requests are due to the anecdote being of insufficent length 
    onError: (error) => {

      // Display the error message 
      notificationStringDispatch({type: "DISPLAY", payload: `${error.response.statusText}. Anecdote is too short. Length must be ≥ 5`})

      // Remove the error notification after 5 seconds 
      setTimeout(() => {
        notificationStringDispatch({type: "CLEAR"})
      }, 5 * 1000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ 'content': content, 'votes': 0 })
    console.log('New anecdote created')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
