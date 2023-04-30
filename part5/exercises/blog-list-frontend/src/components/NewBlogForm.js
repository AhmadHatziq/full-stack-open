import { useState } from 'react'
import PropTypes from 'prop-types'

// Component which returns the form used to input a new blog post 
const NewBlogForm = ({
  handleSubmit
}) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  return (
    <>
      <h1>create new blog post</h1>
      <form onSubmit={(event) => handleSubmit(event, blogTitle, setBlogTitle, blogAuthor, setBlogAuthor, blogUrl, setBlogUrl)}>
        <div>
        title:
          <input
            type="text"
            value={blogTitle}
            name="blogTitle"
            className="blogTitle"
            onChange={({ target }) => {setBlogTitle(target.value)}}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={blogAuthor}
            name="blogAuthor"
            className="blogAuthor"
            onChange={({ target }) => {setBlogAuthor(target.value)}}
          />
        </div>
        <div>
        URL:
          <input
            type="text"
            value={blogUrl}
            name="blogUrl"
            className="blogUrl"
            onChange={({ target }) => {setBlogUrl(target.value)}}
          />
        </div>
        <button type="submit" className="blog-button">create</button>
      </form>
    </>
  )
} 

NewBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default NewBlogForm