import { useState } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import { Menu } from './components/Menu'
import { AnecdoteList } from './components/AnecdoteList'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { CreateNewAnecdote } from './components/CreateNewAnecdote'
import { Anecdote } from './components/Anecdote'

const App = () => {

  // Hardcode the anecdote state 
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  // Notification message state 
  const [notification, setNotification] = useState('')

  // Used to find the anecdotes by ID. 
  const anecdoteById = (id) => { 
    return anecdotes.find(a => a.id === id)
  }

  // Used to vote for a single anecdote 
  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    // If the anecdote matches the id, replases it with the upvoted anecdote 
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  // Obtain the anecdote ID & anecdote using match 
  const anecdoteIdMatch = useMatch('/anecdotes/:id')
  const matchingAnecdote = anecdoteIdMatch
  ? anecdotes.find(anecdote => anecdote.id === Number(anecdoteIdMatch.params.id))
  : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu/>

      <Routes>
        <Route path="/" element={<Menu/>} />
        <Route path="/create" element={<CreateNewAnecdote anecdotes={anecdotes} setAnecdotes={setAnecdotes}/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes}/>}/>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={matchingAnecdote} />} />
        <Route />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
