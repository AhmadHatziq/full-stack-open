import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const newBlog = {
  'title': 'test_blog', 
  'author': 'test_author', 
  'url': 'url.com', 
  'likes': 15, 
  'user': { 'username': 'test_user' }
}

test('If the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  
  // Declare a mock function 
  const mockHandler = jest.fn()

  // Render the component 
  const { container } =  render(<Blog blog={newBlog} user={null} handleLikes={() => mockHandler()} handleDelete={() => {}}/>)

  // Simulate a click on the 'view' button
  const user = userEvent.setup() 
  const visibilityButton = screen.getByText('view')
  await user.click(visibilityButton)

  // Simulate 2 clicks on the 'like' button 
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  // Check that the mock event handler was clicked twice 
  expect(mockHandler.mock.calls).toHaveLength(2)

})

test('Checks that when the view/hide button is clicked, the URL & likes is shown', async () => {
  const { container } =  render(<Blog blog={newBlog} user={null} handleLikes={() => {}} handleDelete={() => {}}/>)

  // Simulate a user click on the button. Requires the userEvent import 
  const user = userEvent.setup() 
  const visibilityButton = screen.getByText('view')
  await user.click(visibilityButton)

  // Check if the URL is visible 
  const urlElement = container.querySelector('.blogUrl')
  expect(urlElement).toBeDefined() 
  expect(urlElement.textContent).toContain('url.com')
  expect(screen.getByText('url.com').closest('div')).toHaveStyle('display: block')

  // Check if the likes is visible 
  const likesElement = container.querySelector('.blogLikes')
  expect(likesElement).toBeDefined() 
  expect(likesElement.textContent).toContain('15')
  expect(likesElement.parentElement.parentElement).toHaveStyle('display: block')
})

test('Checks that the blog title & author is displayed by default, but not the URL & likes', () => {
  const { container } =  render(<Blog blog={newBlog} user={null} handleLikes={() => {}} handleDelete={() => {}}/>)

  // Checks if the author is displaying by default. 
  const authorElement = container.querySelector('.blogAuthor')
  expect(authorElement).toBeDefined() 
  expect(authorElement.textContent).toContain('test_author')
  expect(authorElement).toHaveStyle('display: block')

  // Checks if the title is displaying by default 
  const titleElement = container.querySelector('.blogTitle')
  expect(titleElement).toBeDefined() 
  expect(titleElement.textContent).toContain('test_blog')
  expect(titleElement).toHaveStyle('display: block')

  // Checks if the URL is defined and not displaying by default  
  const urlElement = container.querySelector('.blogUrl')
  expect(urlElement).toBeDefined() 
  expect(urlElement.textContent).toContain('url.com')
  expect(screen.getByText('url.com').closest('div')).toHaveStyle('display: none')

  // Checks if the likes is defined and not displaying by default 
  const likesElement = container.querySelector('.blogLikes')
  expect(likesElement).toBeDefined() 
  expect(likesElement.textContent).toContain('15')
  expect(likesElement.parentElement.parentElement).toHaveStyle('display: none')

})