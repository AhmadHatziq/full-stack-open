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

test('Update likes', async () => {
  const blogToUpdate = helper.initialBlogs[0]
  const updatedBlog = {
    title: blogToUpdate.title, 
    author: blogToUpdate.author, 
    url: blogToUpdate.url, 
    likes: 9999
  }

  await api 
    .put(`/api/blogs/${blogToUpdate._id}`)
    .send(updatedBlog)
    .expect(200)

  const latestBlogFromDb = await Blog.findById(blogToUpdate._id)

  expect(Number(latestBlogFromDb.likes)).toEqual(9999)
  
})

test('Deleting a blog post given the ID', async () => {
  const blogToDelete = helper.initialBlogs[0]

  await api 
    .delete(`/api/blogs/${blogToDelete._id}`)
    .expect(204)

  const blogsInDb = (await Blog.find({})).map(blog => blog.toJSON())
  expect(blogsInDb).toHaveLength(helper.initialBlogs.length - 1)

  const blogTitles = blogsInDb.map(blog => blog.title)
  expect(blogTitles).not.toContain(blogToDelete.title)
})

test('Verifies if new blogs are created with missing title & url, there is a 400 response', async () => {
  const blogMissingTitle = {
    _id: '5a422a851b54a676234d17f2',
    author: 'Author',
    url: 'google.com',
    likes: 4, 
    __v: 0
  }
  await api
    .post('/api/blogs')
    .send(blogMissingTitle)
    .expect(400)

    const blogMissingUrl = {
      _id: '5a422a851b54a676234d17f2',
      title: 'Title', 
      author: 'Author',
      likes: 4, 
      __v: 0
    }
    await api
    .post('/api/blogs')
    .send(blogMissingUrl)
    .expect(400)

})

test('Verifies that if the likes property is missing, it will default to 0', async () => {
  // Create a newBlog with missing 'likes' property
  const newBlog = {
    _id: '5a422a851b54a676234d17f1',
    title: 'Like is missing',
    author: 'Unlikable',
    url: 'google.com',
    __v: 0
  }

  // POST the newBlog
  const createdBlog = (await api.post('/api/blogs').send(newBlog)).body
  
  // Verify that createdBlog has liked set to 0
  expect(Number(createdBlog.likes)).toEqual(0)

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