import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQueryClient, useQuery } from 'react-query' 
import { getAnecdotes, updateAnecdote } from './requests'
import { NotificationContext } from './NotificationContext'
import { useReducer } from 'react'

const App = () => {

  const notificationReducer = (state, action) => {

    switch(action.type) {
  
      // Display the payload text 
      case "DISPLAY": 
        return action.payload 
        break 
  
      // Clears the notification string 
      case "CLEAR": 
        return '' 
        break
  
      default: 
        return ''
  
    }
  }

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })
  const [notificationString, notificationStringDispatch] = useReducer(notificationReducer, '')

  // Handles the logic when the user clicks the 'upvote' button 
  const handleVote = (anecdote) => {
    console.log('Upvote for ', anecdote)
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })

    // Set the notification message to inform the user of a successful upvote 
    notificationStringDispatch({type: "DISPLAY", payload: `You upvoted for: ${anecdote.content}`})

    // Remove the notification message after 5 seconds 
    setTimeout(() => {
      notificationStringDispatch({type: "CLEAR"})
    }, 5 * 1000)

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
      <NotificationContext.Provider value={[notificationString, notificationStringDispatch]}>
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
      </NotificationContext.Provider>
    </div>
  )
}

export default App
