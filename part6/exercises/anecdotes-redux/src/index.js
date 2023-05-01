import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

// Create a combined reducer 
const reducer = combineReducers({
  anecdotes: anecdoteReducer, 
  filter: filterReducer
})

// Create the store with the reducer. Initial state is in the anecdoteReducer. 
const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
