const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./list_helper.test')

// Clear & initialize data for the tests DB. 
beforeEach(async() => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('Verifies that the unique identifier property of blogPosts is named "id"', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body 
  const firstBlog = blogs[0]
  
  expect(firstBlog.id).toBeDefined()
})

test('Correct number of blog posts returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})