// Controller will expose endpoints used for TEST mode. 
// Endpoint will reset the DB. 

const testingRouter = require('express').Router() 
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

// Route to handle the resetting of the TEST DB when running in TEST mode. 
testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  logger.info("TEST DB has been reset.")
  response.status(204).end() 
})

module.exports = testingRouter 
