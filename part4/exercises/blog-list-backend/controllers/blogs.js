const logger = require('../utils/logger')
const blogsRouter = require('express').Router() 
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// GET route for all blog posts
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
    
  response.json(blogs)
})

// GET route for a single blog post 
blogsRouter.get('/:id', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
    
  response.json(blog)
})

// POST route to submit a new blog post
blogsRouter.post('/', async (request, response) => {
  logger.info(`Received via POST: ${JSON.stringify(request.body)}`)

  // Extract the token using the middleware tokenExtractor
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // Extract the user of the token
  const user = await User.findById(decodedToken.id)

  // Create a blog object with the user id
  const blogWithUser = new Blog({...request.body, user: user.id})

  // Save the blog with the user & update the user 
  const newBlog = await blogWithUser.save() 
  user.blogs = user.blogs.concat(newBlog.id)
  await user.save()
  logger.info(`Saved new Blog: ${JSON.stringify(newBlog)}`)
  response.status(201).json(newBlog)
   
})

// DELETE route to delete a particular post 
blogsRouter.delete('/:id', async (request, response) => {

  // Extract the user from the token. 
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  // Extract the blog 
  const blog = await Blog.findById(request.params.id)

  // If both IDs do not match, abort. 
  console.log(blog.user.toString())
  console.log(user.id.toString())

  // Procees with deleting

  /*
  await Blog.findByIdAndRemove(request.params.id)
  logger.info(`Deleted blog ID: ${request.params.id}`)
  response.status(204).end()
  */
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