import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  // Handles new annecdotes
  const addAnnecdotes = (event) => {
    event.preventDefault() 
    
    // Extract the new annecdote 
    const newAnnecdote = event.target.newAnnecdote.value 

    // Clear the form field 
    event.target.newAnnecdote.value = ''
    
    // Create the annecdote 
    // dispatch(createAnecdote({newAnnecdote}))
    dispatch({ type: 'anecdotes/createAnecdote', 'payload': newAnnecdote })

    // Set the notification 
    dispatch({ type: 'notification/setNotification', 'payload': `New anecdote created: "${newAnnecdote}"`})

    // Wait for 5 seconds and display no notification 
    setTimeout(() => {
      dispatch({type: 'notification/setNotification', payload: ''})
    }, 5000)
    
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
