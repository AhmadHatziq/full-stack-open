

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

    // Creates and logs in with the user: testUser2.  
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

    it('Blog can be deleted by the owner', () => {
      
      // Create a new blog as testUser2
      const newBlog = {
        blogTitle: 'Blog to delete', 
        blogAuthor: 'Alfred', 
        blogUrl: 'test.com'
      }
      cy.create_blog_post(newBlog)

      // Delete the blog
      cy.contains("view").click() 
      cy.contains("Delete").click().type('{enter}')

      // Refresh the page and verify that the blog is no longer there 
      cy.visit('http://localhost:3000')
      cy.document().then(doc => {
        const pageText = doc.documentElement.textContent
        expect(pageText).to.not.contain(newBlog.blogTitle)
        expect(pageText).to.not.contain(newBlog.blogAuthor)
        expect(pageText).to.not.contain(newBlog.blogUrl)
      })
      
    })

    it('Only the creator can delete the blog', () => {

      // Create blog under 'testUser2'
      const newBlog = {
        blogTitle: 'Blog to delete', 
        blogAuthor: 'testUser2', 
        blogUrl: 'test.com'
      }
      cy.create_blog_post(newBlog)

      // Create and login as another user 
      cy.contains("logout").click() 
      const notOwner = {
        'name': 'notOwner', 
        'username': 'notOwner', 
        'password': 'testPassword'
      }
      cy.create_new_user(notOwner)
      
      // Check that the blog details are present 
      cy.contains("view").click() 
      cy.contains(newBlog.blogTitle)
      cy.contains(newBlog.blogAuthor)
      cy.contains(newBlog.blogUrl)
      cy.get('button').filter(':contains("like")').should('exist')

      // Check that there is no button with the 'delete' string 
      cy.get('button').filter(':contains("delete")').should('not.exist')

    })

    it('Blogs are ordered according to likes', () => {

      // Create 3 new blogs
      const blog1 = {
        blogTitle: 'Blog 1', 
        blogAuthor: 'testUser2', 
        blogUrl: 'test.com'
      }
      const blog2 = {
        blogTitle: 'Blog 2', 
        blogAuthor: 'testUser2', 
        blogUrl: 'test.com'
      }
      const blog3 = {
        blogTitle: 'Blog 3', 
        blogAuthor: 'testUser2', 
        blogUrl: 'test.com'
      }
      cy.create_blog_post(blog1)
      cy.create_blog_post(blog2)
      cy.create_blog_post(blog3)

      // Like the second blog once. 
      cy.contains('Title: Blog 2').parent('div').find('button:contains("view")').click() 
      cy.contains('Title: Blog 2').parent('div').parent('div').find('button:contains("like")').click() 

      // Like the 3rd blog twice. 
      cy.contains('Title: Blog 3').parent('div').find('button:contains("view")').click() 
      cy.contains('Title: Blog 3').parent('div').parent('div').find('button:contains("like")').click() 
      cy.contains('Title: Blog 3').parent('div').parent('div').find('button:contains("like")').click() 

      // Verify that the ordering is Blog 3 => Blog 2 => Blog 1 
      cy.get('.blog').eq(0).should('contain', 'Title: Blog 3')
      cy.get('.blog').eq(1).should('contain', 'Title: Blog 2') 
      cy.get('.blog').eq(2).should('contain', 'Title: Blog 1') 

    })

  }) // End of 'When logged in' block 
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