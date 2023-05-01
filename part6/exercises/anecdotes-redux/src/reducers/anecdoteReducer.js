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

// Sets action type to UPVOTE, with the ID. 
// Logic for incrementing will be done in the reducer. 
export const upVote = (id) => {
  return {
    type: 'UPVOTE', 
    payload: {
      id: id
    }
  }
}

// reducer is imported at index.js 
// Handles the logic for the various actions, which will affect the store / state. 
const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {

    // Increment the vote by 1, for the specified annecdote ID 
    case 'UPVOTE': 
      
      // Get the desired annecdote
      const id = action.payload.id 

      // Note that array.filter() returns another array. We only want the single element, at index 0 
      const annecdote = state.filter(state => state.id === id)[0]
      
      // Increment the annecdote.vote by 1 
      const upvotedAnnecdote = {...annecdote, votes: parseInt(annecdote.votes) + 1}
      
      // Store the updatedAnnecdote in the state without mutating it 
      return state.map(element => element.id === id ? upvotedAnnecdote : element)
      
    default: 
      return state 
  }
}

export default reducer