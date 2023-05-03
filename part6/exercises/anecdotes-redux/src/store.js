import { configureStore } from '@reduxjs/toolkit'

// export default anecdoteSlice.reducer. Can be any var name as there is only 1 default export (UNNAMED) 
// However, there can be any number of NAMED exports
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer, 
    filter: filterReducer, 
    notification: notificationReducer
  }
})

// Initializze the anecdotes with the backend data 
anecdoteService.getAll().then(anecdotes => 
  store.dispatch({ type: 'anecdotes/setAnecdotes', 'payload': anecdotes})
  )

export default store