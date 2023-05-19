
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/'

// CreateNew anecdote component 
const CreateNewAnecdote = ({
  anecdotes, 
  setAnecdotes, 
  setNotification
}) => {

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Create the new anecdote 
    const newAnecdote = {
      'content': content.value,
      'author': author.value,
      'info': info.value,
      votes: 0
    }

    // Store the new anecdote to the state 
    newAnecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(newAnecdote))

    // Clear the fields 
    content.setValue('')
    author.setValue('')
    info.setValue('')

    // Set the notification state 
    setNotification(`A new anecdote was created: <i> ${newAnecdote.content} </i> by <b> ${newAnecdote.author} </b>`)

    // Redirect the user to see the list of anecdotes 
    navigate('/anecdotes')
  }

  // Calls the reset function for all fields, which empties them. 
  const resetHandler = () => {
    content.clearField() 
    author.clearField() 
    info.clearField() 
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content.value} onChange={content.onChange} type={content.type} />
        </div>
        <div>
          author
          <input name='author' value={author.value} onChange={author.onChange} type={author.type} />
        </div>
        <div>
          url for more info
          <input name='info' value={info.value} onChange={info.onChange} type={info.type} />
        </div>
        <button>create</button>
      </form>
      <button onClick={() => resetHandler()}>reset</button>
    </div>
  )
}

export { CreateNewAnecdote }