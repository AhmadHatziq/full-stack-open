import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import axios from "axios";

const baseUrl = "http://localhost:3003/api/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationColor, setNotificationColor] = useState("green");

  const newBlogFormRef = useRef();

  // Loads blogs via GET
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // Checks if the user is saved in localStorage at the beginning.
  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");

    // Will only proceed if the item exists
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // Returns the user login form
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );

  // Handles logic for user login form
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with ", username, password);

    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });
      console.log("Successful login ", user);

      // Save credentials
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("user", JSON.stringify(user));

      // Reset input fields
      setUsername("");
      setPassword("");
    } catch (exception) {
      // Display an error message upon failed login attempt
      setNotificationMessage("wrong username or password");
      setNotificationColor("red");
      console.log("Failed login for ", username);

      // Removes the notification message after some time
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  // Handles logic for submitting a new blog post via form
  const handleNewBlog = async (
    event,
    blogTitle,
    setBlogTitle,
    blogAuthor,
    setBlogAuthor,
    blogUrl,
    setBlogUrl
  ) => {
    event.preventDefault();

    console.log("New blog details: ", blogTitle, blogAuthor, blogUrl);
    const newBlogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };

    // Save the new blog details & update front end blogs
    const newBlog = await blogService.create(newBlogObject);
    setBlogs(blogs.concat(newBlog));

    // Notify the user of the successful blog post creation
    setNotificationColor("green");
    setNotificationMessage(
      `A new blog titled '${blogTitle}' by ${blogAuthor} is added`
    );
    console.log("Saved new blog");

    // Removes the notification message after some time
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);

    // Clear blog input fields
    setBlogTitle("");
    setBlogAuthor("");
    setBlogUrl("");

    // Hide the form
    newBlogFormRef.current.toggleVisibility();
  };

  // Function used to handle the logic when the 'likes' button is clicked
  // Likes are increased by making an HTTP PUT request to the unique address of the blog post in the backend
  const handleLikes = async (event, blog) => {
    // The API for PUT needs the following properties: title, author, url, likes, user (ID)
    // Blog ID is used to specify the specific blog endpoint.
    // Increment the likes by 1.
    const blogId = blog.id;
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: parseInt(blog.likes) + 1,
      user: blog.user,
    };

    // Send the newblog data via PUT
    await axios.put(`${baseUrl}/${blogId}`, newBlog);

    // Update the state with the new updated blog object.
    // Get the index, update that index and save the state.
    const updatedBlogIndex = blogs.findIndex((blog) => blog.id === blogId);
    const updatedBlogs = [...blogs];
    const updatedBlog = {
      ...blogs[updatedBlogIndex],
      likes: blogs[updatedBlogIndex].likes + 1,
    };
    updatedBlogs[updatedBlogIndex] = updatedBlog;
    setBlogs(updatedBlogs);
  };

  // Handles the DELETE button.
  // Sends a DELETE request to the specific blog ID endpoint.
  const handleDelete = async (event, blog) => {
    if (
      window.confirm(`Remove blog titled '${blog.title}' by '${blog.author}'?`)
    ) {
      try {
        // Send blog delete request to backend
        const blogId = blog.id;
        console.log(`Blog DELETE sent to ${baseUrl}/${blogId}`);
        await blogService.deleteBlog(blogId);

        // Update frontend blogs
        const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
        setBlogs(updatedBlogs);
      } catch (error) {
        console.log("Error in DELETE");
      }
    }
  };

  return (
    <div>
      <Notification
        message={notificationMessage}
        notificationColor={notificationColor}
      />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          Welcome! {user.username} logged in
          <button
            type="button"
            onClick={() => {
              window.localStorage.removeItem("user");
              setUser(null);
            }}
          >
            logout
          </button>
        </div>
      )}

      {user === null ? null : (
        <Togglable buttonLabel="Create new blog post" ref={newBlogFormRef}>
          <NewBlogForm handleSubmit={handleNewBlog} />
        </Togglable>
      )}

      <h2>Blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            user={user}
            key={blog.id}
            blog={blog}
            handleLikes={handleLikes}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  );
};

export default App;
