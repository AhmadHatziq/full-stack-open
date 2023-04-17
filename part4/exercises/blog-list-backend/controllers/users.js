const logger = require('../utils/logger')
const usersRouter = require('express').Router() 
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// GET route for all users
usersRouter.get('/', async (request, response) => {
  logger.info('Hello from users')
  
})

// POST route 
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  logger.info(`Saved user: ${JSON.stringify(savedUser)}`)

  response.status(201).json(savedUser)
})

module.exports = usersRouter
