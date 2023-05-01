import { useDispatch } from 'react-redux'
import { createNewAnnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  // Handles new annecdotes
  const addAnnecdotes = (event) => {
    event.preventDefault() 
    
    // Extract the new annecdote and dispatch it. 
    const newAnnecdote = event.target.newAnnecdote.value 
    dispatch(createNewAnnecdote(newAnnecdote))
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
