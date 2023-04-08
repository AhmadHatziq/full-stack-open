import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [showAll, setShowAll] = useState(true)

  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 

  // If true, will be 'notes'. Else, will only be notes where 'important' is set to true. 
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  // Event handler for form used for inputting new note. 
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    // Change the notes array with a new array
    setNotes(notes.concat(noteObject))
    
    // Reset the text field
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange} 
        />
        <button type="submit">save</button>
      </form>   

    </div>
  )
}

export default App 