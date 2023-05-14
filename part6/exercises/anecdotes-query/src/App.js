import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery } from 'react-query' 
import { getAnecdotes } from './requests'


const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }


  // Obtain and set the anecdotes using React Query. 
  // Note that in index.js, the App component must be wrapped in '<QueryClientProvider client={queryClient}>'
  const result = useQuery('anecdotes', getAnecdotes, {retry: 1})
  if ( result.isLoading ) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
