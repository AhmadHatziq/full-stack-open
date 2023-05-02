import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  // Handles new annecdotes
  const addAnnecdotes = (event) => {
    event.preventDefault() 
    
    // Extract the new annecdote and dispatch it. 
    const newAnnecdote = event.target.newAnnecdote.value 
    
    // dispatch(createNewAnnecdote(newAnnecdote))
    // dispatch(createAnecdote({newAnnecdote}))
    dispatch({ type: 'anecdotes/createAnecdote', 'payload': newAnnecdote })

    event.target.newAnnecdote.value = ''
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
