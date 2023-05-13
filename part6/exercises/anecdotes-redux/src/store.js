import { configureStore } from '@reduxjs/toolkit'

// export default anecdoteSlice.reducer. Can be any var name as there is only 1 default export (UNNAMED) 
// However, there can be any number of NAMED exports
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer, 
    filter: filterReducer, 
    notification: notificationReducer
  }
})

export default store