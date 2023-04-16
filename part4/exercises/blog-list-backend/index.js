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

app.use('/api/blogs', blogRouter)

// Make the server listen on port 3003 or the environment variable (for deployment)
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})