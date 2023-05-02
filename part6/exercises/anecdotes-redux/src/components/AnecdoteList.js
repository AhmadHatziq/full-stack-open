import { useSelector, useDispatch } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  // useSelector will retrieve the state from the store
  // Use the filter state value to filter the anecdotes 
  const anecdotes = useSelector(state => {
    
    if (state.filter === '' || state.filter.length === 0) {
      return state.anecdotes
    }

    // Return the filtered anecdotes 
    const filteredAnecdotes = state.anecdotes.filter(obj => obj.content.toLowerCase().includes(state.filter))

    return filteredAnecdotes
  })

  // useDispatch is used to issue out actions to change the store state. 
  // It will pass the 'action' to the 'reducer' function defined in the store. 
  const dispatch = useDispatch()

  // Dispatches upVote, with a specified ID. 
  // Dispatch needs an object with the 'action' property. 
  const vote = (id) => {
    // dispatch(upVote(id))
    // dispatch(upvoteAnecdote({"id": id}))
    dispatch({ type: 'anecdotes/upvoteAnecdote', payload: id, test: 'test123' })
  }

  return (<>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
  </>)
}

export default AnecdoteList
