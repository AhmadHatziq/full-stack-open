import { useState } from 'react'

const Blog = ({blog}) => {
  // Used to toggle the visibility of the blogStyle class 
  const [visible, setVisible] = useState(true)

  // Used for the button string label 
  const [buttonLabel, setButtonLabel] = useState("view")

  // CSS styles for toggling hiding. Uses the Boolean state 
  const visibilityStyle = {
    display: visible ? 'block' : 'none'
  }

  // Used to toggle the Boolean visibility variable 
  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonLabel("hide")
  }

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
  const blogContent = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={singlePostStyle}>
      <div style={buttonParentStyle}>
        <p style={buttonNeighborStyle}><strong>Title:</strong> {blog.title}</p> 
        <button style={buttonStyle} onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={visibilityStyle}>
        <div style={blogContent}>
          <p><strong>Author:</strong> {blog.author}</p>
          <p><strong>URL:</strong> {blog.url}</p>
          <div style={buttonParentStyle}>
            <p style={buttonNeighborStyle}><strong>Likes:</strong> {blog.likes}</p>
            <button style={buttonStyle}>like</button>
          </div>
          <p><strong>User:</strong> {blog.user.username}</p>
        </div>
      </div>
    </div>  
  )
}

export default Blog