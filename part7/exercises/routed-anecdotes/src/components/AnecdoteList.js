import { Link } from 'react-router-dom'
// AnecdoteList component 
const AnecdoteList = ({ anecdotes }) => {         
                     
  return( 
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        {
          let anecdoteUrl = `http://localhost:3000/anecdotes/${anecdote.id}`
          return (
          <>
            <Link to={anecdoteUrl} >
              <li key={anecdote.id}>{anecdote.content}</li>
            </Link>
          </>
          )
        })
        }
    </ul>
  </div>
)}

export { AnecdoteList }
