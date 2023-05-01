const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

// State is the default state. 
const counterReducer = (state = initialState, action) => {
  
  switch (action.type) {

    // Increment 'good' by 1 
    case 'GOOD':
      return { ...state, good: state.good + 1 }

    // Increment 'ok' bu 1 
    case 'OK':
      return { ...state, ok: state.ok + 1 }

    // Increment 'bad' by 1 
    case 'BAD':
      return { ...state, bad: state.bad + 1 }

    // Reset all to 0. 
    case 'ZERO':
      return initialState

    // Return the default state if there is an undefined action. 
    default: return state
  }
  
}

export default counterReducer
