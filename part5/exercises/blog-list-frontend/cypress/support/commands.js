// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('create_and_login', ({ username, password }) => {

  // Resets the DB
  cy.request('POST', 'http://localhost:3003/api/testing/reset')

  // Creates the test user 
  const testUser = {
    'name': username, 
    'username': username, 
    'password': password
  }
  cy.request('POST', 'http://localhost:3003/api/users', testUser)

  // Logs in with the test user 
  cy.request('POST', 'http://localhost:3003/api/login', testUser)
    .then(response => {
      localStorage.setItem('user', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })

})

// Creates a new blog post with the specified blog arguments 
Cypress.Commands.add('create_blog_post', ({ blogTitle, blogAuthor, blogUrl }) => {
  cy.visit('http://localhost:3000') 
  cy.contains("Create new blog post").click() 
  cy.get('.blogTitle').type(blogTitle)
  cy.get('.blogAuthor').type(blogAuthor)
  cy.get('.blogUrl').type(blogUrl)
  cy.get('.blog-button').click() 
})