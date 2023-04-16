const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./list_helper.test')

// Initialize data to the tests DB. 
beforeEach(async() => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
