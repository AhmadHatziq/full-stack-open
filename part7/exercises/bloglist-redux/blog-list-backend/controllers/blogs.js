const logger = require('../utils/logger')
const blogsRouter = require('express').Router() 
const Blog = require('../models/blog')
const customErrorClasses = require('../utils/custom_error')

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

  // Extract user via the middleware 
  const user = request.user 

  // Create a blog object with the user id
  const blogWithUser = new Blog({...request.body, user: user.id})

  // Save the blog with the user & update the user 
  const newBlog = await blogWithUser.save() 
  user.blogs = user.blogs.concat(newBlog.id)
  await user.save()
  logger.info(`Saved new Blog: ${JSON.stringify(newBlog)}`)

  // Return the newBlog, along with the user
  newBlog.user = user
  response.status(201).json(newBlog)
   
})

// DELETE route to delete a particular post 
blogsRouter.delete('/:id', async (request, response) => {

  // Extract the user (via middleware)
  const user = request.user 

  // Extract the blog 
  const blog = await Blog.findById(request.params.id)

  // Abort if blog does not exist  
  if (!blog) {
    logger.info('Specified blog not found')
    return response.status(404).json({
      error: 'Specified blog not found'
    })
  }

  // If both IDs do not match, abort. 
  if ( blog.user.toString() !== user.id.toString() ) {
    logger.info(`Failed delete attempt by user: ${user.name}`)
    throw new customErrorClasses.OwnerError('Deletion attempt by a non-owner')
  }

  // Procees with deleting from the Blog and User 
  await Blog.findByIdAndRemove(request.params.id)
  user.blogs = user.blogs.filter(id => {
    if (id.toString() !== request.params.id) {
      return id
    }
  })
  await user.save()
  logger.info(`Deleted blog ID: ${request.params.id}`)
  response.status(204).end()
  
})

// PUT route to update a blog post based on blog ID. 
// Used for incrementing the likes. 
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body 
  const id = request.params.id 

  const newPost = {
    title: body.title, 
    author: body.author, 
    url: body.url, 
    likes: parseInt(body.likes), 
    user: body.user.id 
  }

  // Update the DB with the new blog object 
  const updatedPost = await Blog.findByIdAndUpdate(id, newPost, {new: true})
  logger.info(`Updated post: ${JSON.stringify(updatedPost)}`)
  response.json(updatedPost) 
  
})

module.exports = blogsRouter