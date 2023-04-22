import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const newBlogFormRef = useRef() 

  // Loads blogs via GET
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // Checks if the user is saved in localStorage at the beginning. 
  useEffect(() => {
    const userJSON = window.localStorage.getItem('user')

    // Will only proceed if the item exists
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Returns the user login form 
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  // Handles logic for user login form 
  const handleLogin = async (event) => {
    event.preventDefault() 
    console.log('logging in with ', username, password)
    
    try {
      const user = await loginService.login({
        'username': username, 
        'password': password
      })
      console.log('Successful login ', user)

      // Save credentials 
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))

      // Reset input fields
      setUsername('')
      setPassword('')

    } catch (exception) {

      // Display an error message upon failed login attempt 
      setNotificationMessage('wrong username or password')
      setNotificationColor('red')
      console.log('Failed login for ', username)

      // Removes the notification message after some time 
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  // Handles logic for submitting a new blog post 
  const handleNewBlog = async (event) => {
    event.preventDefault() 

    console.log('New blog details: ', blogTitle, blogAuthor, blogUrl)
    const newBlogObject = {
      "title": blogTitle, 
      "author": blogAuthor, 
      "url": blogUrl
    }

    // Save the new blog details & update front end blogs 
    const newBlog = await blogService.create(newBlogObject)
    setBlogs(blogs.concat(newBlog))

    // Notify the user of the successful blog post creation 
    setNotificationColor('green')
    setNotificationMessage(`A new blog titled '${blogTitle}' by ${blogAuthor} is added`)
    console.log('Saved new blog') 

    // Removes the notification message after some time 
    setTimeout(() => {
    setNotificationMessage(null)
    }, 5000)
    
    // Clear blog input fields
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')

    // Hide the form 
    newBlogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Notification message={notificationMessage} notificationColor={notificationColor}/>

      {user === null ? 
        loginForm() : 
        <div>
          Welcome! {user.username} logged in 
          <button 
            type="button"
            onClick={({ event }) => {
              window.localStorage.removeItem('user')
              setUser(null)
            }}>
              logout
          </button>
        </div>
      }

      {user === null ? 
        null 
        : 
        <Togglable buttonLabel='Create new blog post' ref={newBlogFormRef}>
          <NewBlogForm
            blogTitle={blogTitle}
            blogAuthor={blogAuthor} 
            blogUrl={blogUrl} 
            handleSubmit={handleNewBlog}
            handleTitleChange={setBlogTitle}
            handleAuthorChange={setBlogAuthor}
            handleUrlChange={setBlogUrl}
            />
        </Togglable>
      }



      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App