const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./list_helper.test')
const blog = require('../models/blog')

// Clear & initialize data for the tests DB. 
beforeEach(async() => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('Verifies that a new blog post can be added', async () => {
  const newBlog = {
    _id: '5a422a851b54a676234d17f6',
    title: 'New blog title',
    author: 'Person',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1,
    __v: 0
  }

  // POST the newBlog
  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // Get all the blogs from the DB
  const blogs = (await Blog.find({})).map(blog => blog.toJSON())

  // Check that length has increased by 1
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

  // Check that the new blog title is present
  const titles = blogs.map(blog => blog.title)
  expect(titles).toContain('New blog title')

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