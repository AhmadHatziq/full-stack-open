import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import Blog from './Blog'

test('Checks that the blog title & author is displayed by default, but not the URL & likes', () => {
  const newBlog = {
    'title': 'test_blog', 
    'author': 'test_author', 
    'url': 'url.com', 
    'likes': 15, 
    'user': { 'username': 'test_user' }
  }

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