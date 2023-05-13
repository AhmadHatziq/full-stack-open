import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notifyAndRemove } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  // Handles new annecdotes
  const addAnnecdotes = (event) => {
    event.preventDefault() 
    
    // Extract the new annecdote 
    const newAnnecdoteString = event.target.newAnnecdote.value 

    // Clear the form field 
    event.target.newAnnecdote.value = ''
    
    // Create the annecdote 
    // dispatch(createAnecdote({newAnnecdote}))
    // dispatch({ type: 'anecdotes/createAnecdote', 'payload': newAnnecdote })
    dispatch(addAnecdote({newAnnecdoteString}))

    // Set the notification for 5 seconds 
    dispatch(notifyAndRemove({notificationString: `New anecdote created: "${newAnnecdoteString}"`, durationInSeconds: 5}))
    
  }

  return(<>
    <h2>create new</h2>
      <form onSubmit={addAnnecdotes}>
        <div><input name="newAnnecdote" /></div>
        <button>create</button>
      </form>
  </>)
}

export default AnecdoteForm 
