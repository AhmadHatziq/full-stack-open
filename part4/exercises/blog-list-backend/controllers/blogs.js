const logger = require('../utils/logger')
const blogsRouter = require('express').Router() 
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  logger.info(`Received via POST: ${JSON.stringify(blog)}`)

  blog
    .save()
    .then(result => {
      logger.info(`Saved new Blog: ${JSON.stringify(blog)}`)
      response.status(201).json(result)
    })
   
})

module.exports = blogsRouter