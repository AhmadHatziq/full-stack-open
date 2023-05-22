const logger = require('../utils/logger')
const usersRouter = require('express').Router() 
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const customErrors = require('../utils/custom_error')

// GET route for all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

// POST route 
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // Checks if the password is ≥ 3 characters long 
  if (password.length < 3) {
    throw new customErrors.ValidationError('Password length must be ≥ 3 characters long');
  }

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
