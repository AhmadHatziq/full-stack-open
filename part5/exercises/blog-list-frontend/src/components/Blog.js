import { useState } from 'react'


const Blog = ({blog, handleLikes, handleDelete, user}) => {
  // Used to toggle the visibility of the blogStyle class 
  const [visible, setVisible] = useState(true)

  // Used for the button string label 
  const [buttonLabel, setButtonLabel] = useState("hide")

  // CSS styles for toggling hiding. Uses the Boolean state 
  const visibilityStyle = {
    display: visible ? 'block' : 'none'
  }

  // Used to toggle the Boolean visibility variable 
  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonLabel(visible ? "view" : "hide")
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

  // Delete button only displays if the logged-in user is the blog author. Check via username. 
  const deleteButton = () => {

    // Check if the user is logged in 
    if (user) {

      // Check if the fields match to determine if the user is the owner 
      if ((blog.user.name === user.name) && (blog.user.username === user.username)) {
        return(
          <>
            <button onClick={(event) => handleDelete(event, blog)} style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px', border: 'none' }}>
                  Delete
            </button>
          </>)
    }
    return(<></>)
    } 
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
            <button style={buttonStyle} onClick={(event) => handleLikes(event, blog)}>like</button>
          </div>
          <p><strong>User:</strong> {blog.user.username}</p>
          {deleteButton()}
        </div>
      </div>
    </div>  
  )
}

export default Blog