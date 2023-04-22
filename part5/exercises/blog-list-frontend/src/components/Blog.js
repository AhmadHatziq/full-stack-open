const Blog = ({blog}) => (
  <div  style={{ 
    border: "1px solid black",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px"
  }}>
    <p><strong>Title:</strong> {blog.title}</p>
    <p><strong>Author:</strong> {blog.author}</p>
    <p><strong>URL:</strong> {blog.url}</p>
    <p><strong>Likes:</strong> {blog.likes}</p>
    <p><strong>User:</strong> {blog.user.username}</p>
    
  </div>  
)

export default Blog