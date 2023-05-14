import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useMutation, useQueryClient, useQuery } from 'react-query' 
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    console.log('vote for ', anecdote)

    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
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
