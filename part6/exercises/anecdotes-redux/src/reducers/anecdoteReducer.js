import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// Used to initialize the anecdotes to store the content, id and vote fields 
const initialState = anecdotesAtStart.map(asObject)

// Use createSlice to define the reducer name, initialState, reducer actions 
const anecdoteSlice = createSlice({
  // All actions will be called as dispatch({ type: 'anecdotes/anecdoteAction', payload: 'Some payload' })
  name: 'anecdotes',
  initialState: [], 
  reducers: {

    // Append an anecdote to the state 
    appendAnecdote(state, action) {
      state.push(action.payload)
    }, 

    // Sets the state with the payload 
    setAnecdotes(state, action) {
      return action.payload 
    }, 

    // Upvotes a single anecdote based on id (action.payload.id)
    upvoteAnecdote(state, action) {

      // To print the state, need to use:  JSON.parse(JSON.stringify(state)
      console.log('upvoteAnecdote state: ', JSON.parse(JSON.stringify(state)))
      // console.log('upvoteAnecdote action: ', action)

      // Note that we are not restricted to using 'action.payload'. 
      // Anything else defined can also be accessed. 
      // Eg action.test == 'test123' 

      // Get the desired annecdote via action.payload. 
      // Is this by convention? 
      const id = action.payload

      // Extract annecdote list from the state
      let annecdotes = state

      // Note that array.filter() returns another array. We only want the single element, at index 0 
      const annecdote = annecdotes.filter(state => state.id === id)[0]
      
      // Increment the annecdote.vote by 1 
      const upvotedAnnecdote = {...annecdote, votes: parseInt(annecdote.votes) + 1}
      
      // Store the updatedAnnecdote in the state without mutating it 
      const newAnnecdoteList =  annecdotes.map(element => element.id === id ? upvotedAnnecdote : element).sort((a, b) => b.votes - a.votes)
      return newAnnecdoteList
    }, 

    // Store a new anecdote 
    createAnecdote(state, action) {

      // console.log('createAnecdote', JSON.parse(JSON.stringify(state)))

      // Extract annecdote list from the state
      let annecdotes = state

      // Create the new annecdote object 
      const newAnnecdote = {
        content: action.payload, 
        id: getId(), 
        votes: 0
      }

      // Return the state, with the newly created annecdote appended. 
      const newStateWithNewAnnecdote = annecdotes.concat(newAnnecdote).sort((a, b) => b.votes - a.votes)
      return newStateWithNewAnnecdote
    }
  }
})

export const { createAnecdote, upvoteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions 
export default anecdoteSlice.reducer 
