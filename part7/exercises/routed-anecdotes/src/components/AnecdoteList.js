// AnecdoteList component 
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        {
          let anecdoteUrl = `http://localhost:3000/anecdotes/${anecdote.id}`
          return (
          <>
            <a href={anecdoteUrl}>
              <li key={anecdote.id} >{anecdote.content}</li>
            </a>
          </>
          )
        })
        }
    </ul>
  </div>
)

export { AnecdoteList }