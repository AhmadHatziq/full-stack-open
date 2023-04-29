describe('Blog List App', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })
})