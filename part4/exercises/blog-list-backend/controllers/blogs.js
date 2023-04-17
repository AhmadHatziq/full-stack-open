const logger = require('../utils/logger')
const blogsRouter = require('express').Router() 
const Blog = require('../models/blog')
const User = require('../models/user')

// GET route for all blog posts
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
    
  response.json(blogs)
})

// POST route to submit a new blog post
blogsRouter.post('/', async (request, response) => {
  logger.info(`Received via POST: ${JSON.stringify(request.body)}`)

  // Create a blog object with the user id
  const allUsers = (await User.find({})).map(u => u.toJSON())
  const firstUser = allUsers[0]
  const blogWithUser = new Blog({...request.body, user: firstUser.id})

  // Save the blog with the user, update the user 
  const newBlog = await blogWithUser.save() 
  const ownerUser = await User.findById(firstUser.id)
  ownerUser.blogs = ownerUser.blogs.concat(newBlog.id)
  await ownerUser.save()
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