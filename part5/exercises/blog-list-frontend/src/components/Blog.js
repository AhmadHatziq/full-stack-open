const Blog = ({blog}) => {

  // Style for each blog post 
  const singlePostStyle = {
    border: "1px solid black",
      borderRadius: "5px",
      padding: "10px",
      margin: "10px", 
      
  }

  // Style for the header and button div 
  const buttonParentStyle = {
    margin: 0,
    display: "flex",
    alignItems: "center",
  }

  // Style for the button 
  const buttonStyle = {
    marginLeft: "10px",
  }

  // Style for the title 
  const buttonNeighborStyle = {
    marginRight: "10px",
  }

  // Style for the other details 
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={singlePostStyle}>
      <div style={buttonParentStyle
  }>
        <p style={buttonNeighborStyle
    }><strong>Title:</strong> {blog.title}</p> 
        <button style={buttonStyle}>Click me!</button>
      </div>
      <div style={blogStyle}>
        <p><strong>Author:</strong> {blog.author}</p>
        <p><strong>URL:</strong> {blog.url}</p>
        <div style={buttonParentStyle
    }>
          <p style={buttonNeighborStyle
      }><strong>Likes:</strong> {blog.likes}</p>
          <button style={buttonStyle}>like</button>
        </div>
        
        <p><strong>User:</strong> {blog.user.username}</p>
      </div>
    </div>  
  )
}

export default Blog