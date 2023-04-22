import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    }
  }, 
    [])

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
      window.localStorage.setItem('user', JSON.stringify(user))

      // Reset input fields
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('Invalid credentials')
      console.log('Failed login for ', username)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  return (
    <div>
      <Notification message={errorMessage}/>

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

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App