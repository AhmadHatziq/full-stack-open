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
})

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