
// Component which returns the form used to input a new blog post 
const NewBlogForm = ({
  blogTitle, blogAuthor, blogUrl, 
  handleSubmit, handleTitleChange, handleAuthorChange, handleUrlChange
}) => {
  return (
    <>
      <h1>create new blog post</h1>
      <form onSubmit={handleSubmit}>
      <div>
        title:
          <input
          type="text"
          value={blogTitle}
          name="blogTitle"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={blogAuthor}
          name="blogAuthor"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        URL:
          <input
          type="text"
          value={blogUrl}
          name="blogUrl"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
      </form>
    </>
  )
} 

export default NewBlogForm