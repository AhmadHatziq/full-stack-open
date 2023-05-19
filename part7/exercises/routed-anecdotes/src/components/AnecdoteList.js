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
          <li key={anecdote.id}>
            <Link to={anecdoteUrl}>
              {anecdote.content}	
            </Link>
          </li>
          )
        })
        }
    </ul>
  </div>
)}

export { AnecdoteList }
