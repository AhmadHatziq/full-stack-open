import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('When a new blog is created, the form calls the event handler (prop) with correct blog details', async () => {
  const createBlog = jest.fn() 
  const user = userEvent.setup() 

  const { container } = render(<NewBlogForm handleSubmit={createBlog}/>)

  // Input blog title
  const titleElement = container.querySelector(`input[name="blogTitle"]`)
  await user.type(titleElement, 'Blog Title')

  // Input blog author 
  const authorElement = container.querySelector(`input[name="blogAuthor"]`)
  await user.type(authorElement, 'Blog Author')

  // Input blog url 
  const urlElement = container.querySelector(`input[name="blogUrl"]`)
  await user.type(urlElement, 'Blog URL')

  // Click the create button 
  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  // The argument is: handleSubmit(event, blogTitle, setBlogTitle, blogAuthor, setBlogAuthor, blogUrl, setBlogUrl)}>
  
  // Check for the 2nd argument ie index 1, which is blog title. 
  expect(createBlog.mock.calls[0][1]).toBe('Blog Title') // 2nd argument of first call 

  // Check for the 4th argument ie index 3 for Blog Author 
  expect(createBlog.mock.calls[0][3]).toBe('Blog Author') 

  // Check for the 6th argument ie index 5 for Blog URL
  expect(createBlog.mock.calls[0][5]).toBe('Blog URL')

})