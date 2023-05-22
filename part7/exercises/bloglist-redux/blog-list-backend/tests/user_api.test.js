const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./list_helper.test')
const bcrypt = require('bcryptjs')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

// Clear data for the tests DB. 
beforeEach(async() => {
  await User.deleteMany({})
})

describe('When there is initially one user in the DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('Invalid user with username & password of 1 character is not created', async () => {
    const invalidPasswordUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: '1',
    }

    await api
      .post('/api/users')
      .send(invalidPasswordUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const invalidUsernameUser = {
      username: '1',
      name: 'Matti Luukkainen',
      password: 'Luukkainen',
    }

    await api
    .post('/api/users')
    .send(invalidUsernameUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  })

  test('Creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('Creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})