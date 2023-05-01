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

    console.log(`Good function. State: `)
    console.log(store.getState())

  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button>ok</button> 
      <button>bad</button>
      <button>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok</div>
      <div>bad</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
