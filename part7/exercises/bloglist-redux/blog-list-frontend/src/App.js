import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useMatch } from "react-router-dom";
import User from "./components/User";
import Users from "./components/Users";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import {
  setNotificationMessage,
  setNotificationColor,
} from "./reducers/notificationReducer";
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import { setUser, initializeUsers } from "./reducers/userReducer";
import BlogDisplay from "./components/BlogDisplay";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const baseUrl = "http://localhost:3003/api/blogs";

const App = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user.user); // user stores the logged-in user
  const users = useSelector((state) => state.user.users); // users stores all the users
  const blogs = useSelector((state) => state.blogs);
  const notificationMessage = useSelector((state) => {
    return state.notification.notificationMessage;
  });
  const notificationColor = useSelector(
    (state) => state.notification.notificationColor
  );
  const newBlogFormRef = useRef();

  // Initialize blogs and users data from backend
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  // Checks if the user is saved in localStorage at the beginning.
  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");

    // Will only proceed if the item exists
    if (userJSON) {
      const user = JSON.parse(userJSON);
      dispatch(setUser(user));
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
      dispatch(setUser(user));
      blogService.setToken(user.token);
      window.localStorage.setItem("user", JSON.stringify(user));

      // Reset input fields
      setUsername("");
      setPassword("");
    } catch (exception) {
      // Display an error message upon failed login attempt
      dispatch(setNotificationMessage("wrong username or password"));
      dispatch(setNotificationColor, "red");
      console.log("Failed login for ", username);

      // Removes the notification message after some time
      setTimeout(() => {
        dispatch(setNotificationMessage(null));
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
    dispatch(createBlog(newBlogObject));

    // Notify the user of the successful blog post creation
    dispatch(
      setNotificationMessage(
        `A new blog titled '${blogTitle}' by ${blogAuthor} is added`
      )
    );
    dispatch(setNotificationColor, "green");
    console.log("Saved new blog");

    // Removes the notification message after some time
    setTimeout(() => {
      dispatch(setNotificationMessage(null));
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

    // Dispatch the action to handle the liking of a new blog
    dispatch(
      likeBlog({
        blogId: blogId,
        updatedBlog: newBlog,
      })
    );
  };

  // Handles the DELETE button.
  // Sends a DELETE request to the specific blog ID endpoint.
  const handleDelete = async (event, blog) => {
    if (
      window.confirm(`Remove blog titled '${blog.title}' by '${blog.author}'?`)
    ) {
      try {
        // Dispatch blog deletion action
        const blogId = blog.id;
        console.log(`Blog DELETE sent to ${baseUrl}/${blogId}`);
        dispatch(
          deleteBlog({
            blogId: blogId,
          })
        );
      } catch (error) {
        console.log("Error in DELETE");
      }
    }
  };

  // Render the blogs in the blogs state
  const renderBlogs = () => {
    const blogsCopy = [...blogs];
    return blogsCopy
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => {
        return (
          <Blog
            user={user}
            key={blog.id}
            blog={blog}
            handleLikes={handleLikes}
            handleDelete={handleDelete}
          />
        );
      });
  };

  // Display the blogs or string, if no blogs are present
  const displayBlogs = () => {
    return (
      <>
        <h2>Blogs</h2>
        {blogs && blogs.length > 0 ? (
          <div>{renderBlogs()}</div>
        ) : (
          <p>No blogs found</p>
        )}
      </>
    );
  };

  // Display the blog form
  const displayBlogForm = () => {
    return (
      <>
        {user === null ? null : (
          <Togglable buttonLabel="Create new blog post" ref={newBlogFormRef}>
            <NewBlogForm handleSubmit={handleNewBlog} />
          </Togglable>
        )}
      </>
    );
  };

  // Display the login form and current user logged in
  const displayUserState = () => {
    return (
      <>
        {user === null ? (
          loginForm()
        ) : (
          <div>
            Welcome! {user.username} logged in
            <button
              type="button"
              onClick={() => {
                window.localStorage.removeItem("user");
                dispatch(setUser(null));
              }}
            >
              logout
            </button>
          </div>
        )}
      </>
    );
  };

  // Display the main page: User login, notification, blogs
  const displayMainPage = () => {
    return (
      <>
        <Notification
          message={notificationMessage}
          notificationColor={notificationColor}
        />
        {displayUserState()}
        {displayBlogForm()}
        {displayBlogs()}
      </>
    );
  };

  // Display the "/users" route
  const displayUsers = () => {
    return (
      <>
        <Notification
          message={notificationMessage}
          notificationColor={notificationColor}
        />
        {displayUserState()}
        <h2>Users</h2>
        <Users blogs={blogs} />
      </>
    );
  };

  // Display the "/users/id" route
  const displayUser = (userIdMatch) => {
    // Get the matching user from 'users'
    const matchingUser = userIdMatch
      ? users.find((user) => user.id === userIdMatch.params.userId)
      : null;

    return (
      <>
        <Notification
          message={notificationMessage}
          notificationColor={notificationColor}
        />
        {displayUserState()}
        <User
          blogs={blogs}
          userIdMatch={userIdMatch}
          matchingUser={matchingUser}
        />
      </>
    );
  };

  // Diplay the "/blogs/id" route
  const displayBlog = (blogIdMatch) => {
    // Get the matching blog from 'blogs'
    const matchingBlog = blogIdMatch
      ? blogs.find((blog) => blog.id === blogIdMatch.params.blogId)
      : null;

    return (
      <>
        <Notification
          message={notificationMessage}
          notificationColor={notificationColor}
        />
        {displayUserState()}
        <BlogDisplay blog={matchingBlog} />
      </>
    );
  };

  // Display the navigation bar
  const displayNavBar = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

  // Obtain user ID
  const userIdMatch = useMatch("/users/:userId");

  // Obtain blog ID
  const blogIdMatch = useMatch("/blogs/:blogId");

  return (
    <div>
      {displayNavBar()}
      <Routes>
        <Route path="/users" element={displayUsers()}></Route>
        <Route path="/" element={displayMainPage()}></Route>
        <Route path="/users/:userId" element={displayUser(userIdMatch)}></Route>
        <Route path="/blogs/:blogId" element={displayBlog(blogIdMatch)}></Route>
      </Routes>
    </div>
  );
};

export default App;
