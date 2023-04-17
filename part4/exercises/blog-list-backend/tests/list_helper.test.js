const listHelper = require('../utils/list_helper')
const User = require('../models/user')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe('Find author with highest cumulative likes', () => {

  test('Single blog, should return same author', () => {
    const expectedResult = {
      author: listWithOneBlog[0].author, 
      likes: listWithOneBlog[0].likes 
    }
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(expectedResult)
  })

  test('List of blogs, should return Edsger', () => {
    const expectedResult = {
      author: "Edsger W. Dijkstra", 
      likes: 17
    }
    const result = listHelper.mostLikes(initialBlogs)
    expect(result).toEqual(expectedResult)
  })

})

describe('Find author with most blogs', () => {
  test('Singe blog. Should return same author and count of 1', () => {
    const expectedResult = {
      author: listWithOneBlog[0].author, 
      blogs: listWithOneBlog.length 
    }
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(expectedResult)
  })

  test('List of blogs, should return Robert C. Martin with 3 blogs', () => {
    const expectedResult = {
      author: 'Robert C. Martin', 
      blogs: 3
    }
    const result = listHelper.mostBlogs(initialBlogs)
    expect(result).toEqual(expectedResult)
  })
})

describe('Highest likes', () => {

  test('Single blog. Should return the same blog.', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('Multiple blogs', () => {
    const expectedBlog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }
    const result = listHelper.favoriteBlog(initialBlogs)
    expect(result).toEqual(expectedBlog)
    
  })
})

describe('Total likes', () => {
  
  test('List contains 1 blog with 5 likes.', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('A list of blogs, where sum is 36 likes.', () => {
    const result = listHelper.totalLikes(initialBlogs)
    expect(result).toBe(36)
  })

})

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs, usersInDb
}