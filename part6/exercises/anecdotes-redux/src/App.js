import { useSelector, useDispatch } from 'react-redux'
import { upVote } from './reducers/anecdoteReducer'

const App = () => {

  // useSelector will retrieve the state from the store
  const anecdotes = useSelector(state => state)

  // useDispatch is used to issue out actions to change the store state. 
  // It will pass the 'action' to the 'reducer' function defined in the store. 
  const dispatch = useDispatch()

  // Dispatches upVote, with a specified ID. 
  // Dispatch needs an object with the 'action' property. 
  const vote = (id) => {
    dispatch(upVote(id))

  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App