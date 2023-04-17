const logger = require('../utils/logger')
const usersRouter = require('express').Router() 
const User = require('../models/user')

// GET route for all blog posts
usersRouter.get('/', async (request, response) => {
  logger.info('Hello from users')
  
})

module.exports = usersRouter
