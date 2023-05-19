import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// CreateNew anecdote component 
const CreateNewAnecdote = ({
  anecdotes, 
  setAnecdotes, 
  setNotification
}) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Create the new anecdote 
    const newAnecdote = {
      content,
      author,
      info,
      votes: 0
    }

    // Store the new anecdote to the state 
    newAnecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(newAnecdote))

    // Clear the fields 
    setContent('')
    setAuthor('')
    setInfo('')

    // Set the notification state 
    setNotification(`A new anecdote was created: <i> ${newAnecdote.content} </i> by <b> ${newAnecdote.author} </b>`)

    // Redirect the user to see the list of anecdotes 
    navigate('/anecdotes')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export { CreateNewAnecdote }