// Import statements 
require('dotenv').config() 
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')

// App declarations 
const app = express() 
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

// Connect to MongoDB 
const mongoUrl = process.env.MONGODB_URI
console.log('connecting to', mongoUrl)
mongoose.connect(mongoUrl)
  .then( () => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

module.exports = app