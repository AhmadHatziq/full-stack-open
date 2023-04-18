const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  logger.error('Unknown endpoint error')
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error('Error: ', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'OwnerError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

// Extracts the user from the token and sets it to the request object. 
// Used to find out who the user holding a specific token is. 
const userExtractor = async (request, response, next) => {

  if (request.token) {

    logger.info(JSON.stringify(request.token))
    logger.info(`Extracted user ${JSON.stringify(user)} from token`)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    // request.user = user 

    
  }

  next() 
}

// Extracts the token from the Authorization header and place it into the token field of the request object. 
const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')
  request.token = null 
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  if (authorization && authorization.startsWith('bearer ')) {
    request.token = authorization.replace('bearer ', '')
  }

  next() 
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler, 
  tokenExtractor, 
  userExtractor 
}