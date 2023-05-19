import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import App from './App'
import NotesApp from './NotesApp'

// ReactDOM.createRoot(document.getElementById('root')).render(<Router><NotesApp /></Router>)
ReactDOM.createRoot(document.getElementById('root')).render(<Router><App /></Router>)