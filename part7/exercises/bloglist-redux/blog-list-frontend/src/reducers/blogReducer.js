import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    // Set the blog state
    setBlogs(state, action) {
      return action.payload;
    },

    // Append a new blog to the state
    appendBlog(state, action) {
      state.push(action.payload);
    },

    // Like a blog given the ID.
    // Only updates the frontend state
    likeBlogFrontend(state, action) {
      // NTS: Use this statement to log the state variables
      // console.log("likeBlogFrontend", JSON.parse(JSON.stringify(state)));

      const blogId = action.payload.blogId;
      const blogsCopy = [...JSON.parse(JSON.stringify(state))];

      // Update the state with the new updated blog object.
      // Get the index, update that index and save the state.
      const updatedBlogIndex = blogsCopy.findIndex(
        (blog) => blog.id === blogId
      );
      const updatedBlogs = [...blogsCopy];
      const updatedBlog = {
        ...blogsCopy[updatedBlogIndex],
        likes: blogsCopy[updatedBlogIndex].likes + 1,
      };
      updatedBlogs[updatedBlogIndex] = updatedBlog;
      return updatedBlogs;
    },

    // Remove a blog from the state
    removeBlogFrontend(state, action) {
      const blogId = action.payload;
      const blogsCopy = [...JSON.parse(JSON.stringify(state))];
      const updatedBlogs = blogsCopy.filter((blog) => blog.id !== blogId);
      return updatedBlogs;
    },

    // Replace a blog, given the new blog. Looks at the ID of the payload blog
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const blogId = updatedBlog.id;

      let blogsCopy = [...state];

      // Find the index of the blog to update
      const blogIndex = blogsCopy.findIndex((blog) => blog.id === blogId);

      // If the blog is found, replace it with the updated blog
      if (blogIndex !== -1) {
        blogsCopy[blogIndex] = updatedBlog;
      }

      return blogsCopy;
    },
  },
});

// Delete a blog via DELETE request to the backend and updating frontend state
export const deleteBlog = ({ blogId }) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blogId);
    dispatch(removeBlogFrontend(blogId));
  };
};

// Upvote a blog. Do a PUT request to the backend and update the frontend state
export const likeBlog = ({ blogId, updatedBlog }) => {
  return async (dispatch) => {
    await blogService.updateBlog(blogId, updatedBlog);
    dispatch(likeBlogFrontend({ blogId: blogId }));
  };
};

// Obtains data from the backend
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogsFromBackend = await blogService.getAll();
    dispatch(setBlogs(blogsFromBackend));
  };
};

// Creates a new blog
export const createBlog = (newBlogObject) => {
  return async (dispatch) => {
    // Issue a POST to the backend
    const newBlog = await blogService.create(newBlogObject);

    // Update the frontend state
    dispatch(appendBlog(newBlog));
  };
};

// Add a comment for a blog
export const addBlogComment = ({ newComment, blog }) => {
  return async (dispatch) => {
    // Create a new blog object, with the new comment
    const updatedComments = [...blog.comments].concat(newComment);
    const updatedBlog = { ...blog, comments: updatedComments };

    // Issue a PUT request to the backend
    const blogId = blog.id;
    await blogService.updateBlog(blogId, updatedBlog);

    // Update the frontend state
    dispatch(updateBlog(updatedBlog));
  };
};

export default blogSlice.reducer;
export const {
  setBlogs,
  appendBlog,
  likeBlogFrontend,
  removeBlogFrontend,
  updateBlog,
} = blogSlice.actions;
