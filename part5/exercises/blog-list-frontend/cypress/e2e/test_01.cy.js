

describe('Blog List App', () => {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
  })

  it(`The string "Blogs" exists`, () => {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  it(`Displays the login form by default`, () => {
    cy.visit('http://localhost:3000')
    cy.contains('login')
    cy.contains('username')
    cy.contains('password') 
  })

  describe('When logged in', () => {

    // Creates and logs in with the user.  
    beforeEach(function() {
      cy.create_and_login({"username": "testUser2", "password": "testPassword"})
    })

    it(`Check if login is successful with the token`, () => {
      cy.contains("Welcome!")
      cy.contains("logged in")
    })

    it('A blog can be created', () => {
      cy.contains("Create new blog post").click() 

      // Declare details of the new blog 
      const blogTitle = 'New blog'
      const blogAuthor ='Alfred'
      const blogUrl = 'https://test.com'

      // Input new blog details 
      cy.get('.inputBlogTitle').type(blogTitle)
      cy.get('.inputBlogAuthor').type(blogAuthor)
      cy.get('.inputBlogUrl').type(blogUrl)
      cy.get('.submit-blog-button').click() 

      // Checks if the new blog details are present in the page 
      cy.contains("view").click() 
      cy.contains(blogTitle)
      cy.contains(blogAuthor)
      cy.contains(blogUrl)

    })

    it('Blog can be liked', () => {

      // Create a new blog 
      const newBlog = {
        blogTitle: 'Blog title', 
        blogAuthor: 'Alfred', 
        blogUrl: 'test.com'
      }
      cy.create_blog_post(newBlog)

      // Verify that the current like is at 0 
      cy.contains("view").click() 
      cy.contains("Likes: 0")

      // Click the 'like' button 
      cy.contains("like").click() 

      // Check that the likes have incremented by 1 (like updates the frontend)
      cy.contains("Likes: 1")

      // Refresh the page and check that the likes is still 1 (like updates the backend)
      cy.visit('http://localhost:3000')
      cy.contains("view").click() 
      cy.contains("Likes: 1")

    })



  }) // End of login block 
})

// Tests the login capabilities of the application. 
describe('Login', () => {

  // Reset the TEST DB and create a new user 
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const testUser = {
      'name': 'testUser', 
      'username': 'testUser', 
      'password': 'testPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users', testUser)
    
  })

  it('Fails with wrong credentials', () => {
    cy.visit('http://localhost:3000')

    // Login with incorrect credentials 
    const correctUsername = 'testUser'
    const wrongPassword = 'password'
    cy.get('#username').type(correctUsername)
    cy.get('#password').type(wrongPassword)
    cy.get('#login-button').click()

    // There should be an error message with the string 'wrong username or password'
    const expectedErrorMessage = 'wrong username or password'
    cy.contains(expectedErrorMessage)

    // There should be a div with class name 'error' and color red 
    cy.get('div.error').should('have.css', 'color', 'rgb(255, 0, 0)');
  })

  it('Succeeds with correct credentials', () => {
    cy.visit('http://localhost:3000')

    // Login with correct credentials 
    const correctUsername = 'testUser'
    const correctPassword = 'testPassword'
    cy.get('#username').type(correctUsername)
    cy.get('#password').type(correctPassword)
    cy.get('#login-button').click()

    // Upon successful login, there should be the strings "Welcome! testUser logged in"
    cy.contains("Welcome!")
    cy.contains("logged in")
    
  })


})