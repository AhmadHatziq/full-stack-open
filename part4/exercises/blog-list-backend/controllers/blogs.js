const logger = require('../utils/logger')
const blogsRouter = require('express').Router() 
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  logger.info(`Received via POST: ${JSON.stringify(blog)}`)

  const newBlog = await blog.save() 
  logger.info(`Saved new Blog: ${JSON.stringify(newBlog)}`)
  response.status(201).json(newBlog)

  /*
  blog
    .save()
    .then(result => {
      logger.info(`Saved new Blog: ${JSON.stringify(blog)}`)
      response.status(201).json(result)
    })
  */ 
   
})

module.exports = blogsRouter