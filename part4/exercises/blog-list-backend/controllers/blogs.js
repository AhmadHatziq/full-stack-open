const logger = require('../utils/logger')
const blogsRouter = require('express').Router() 
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Returns the JWT token from the authentication header bearer scheme 
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  if (authorization && authorization.startsWith('bearer ')) {
    return authorization.replace('bearer ', '')
  }
  return null
}

// GET route for all blog posts
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
    
  response.json(blogs)
})

// POST route to submit a new blog post
blogsRouter.post('/', async (request, response) => {
  logger.info(`Received via POST: ${JSON.stringify(request.body)}`)

  // Gets the user from the JWT token
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  // Create a blog object with the user id
  const blogWithUser = new Blog({...request.body, user: user.id})

  // Save the blog with the user, update the user 
  const newBlog = await blogWithUser.save() 
  user.blogs = user.blogs.concat(newBlog.id)
  await user.save()
  logger.info(`Saved new Blog: ${JSON.stringify(newBlog)}`)
  response.status(201).json(newBlog)
   
})

// DELETE route to delete a particular post 
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  logger.info(`Deleted blog ID: ${request.params.id}`)
  response.status(204).end()
})

// PUT route to update a blog post. 
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body 
  const id = request.params.id 

  const newPost = {
    title: body.title, 
    author: body.author, 
    url: body.url, 
    likes: body.likes 
  }

  const updatedPost = await Blog.findByIdAndUpdate(id, newPost, {new: true})
  logger.info(`Updated post: ${JSON.stringify(updatedPost)}`)
  response.json(updatedPost) 
  
})

module.exports = blogsRouter