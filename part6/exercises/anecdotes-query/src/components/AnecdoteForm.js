import { useMutation, useQueryClient } from 'react-query' 
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  // Handles the mutation when a new anecdote is added by the user. 
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {

      // Invalidates the cache, which causes a re-render
      queryClient.invalidateQueries('anecdotes')
    
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ 'content': content })
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
