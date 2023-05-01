import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

// The reducer is only given as a parameter to the createStore function. 
// Store contains the current state. 
const store = createStore(reducer)

const App = () => {
  const good = () => {

    // Dispatcher is used to do the reducer actions. 
    store.dispatch({
      type: 'GOOD'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const okay = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={okay}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
