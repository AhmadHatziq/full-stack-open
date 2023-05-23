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
  },
});

// Upvote a blog. Do a PUT request to the backend and update the frontend state
export const likeBlog = ({ blogId, updatedBlog }) => {
  return async (dispatch) => {
    // Do a PUT request to the backend
    await blogService.updateBlog(blogId, updatedBlog);

    // Update the frontend state
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

    console.log("From blog reducer, created: ", newBlog);
  };
};

export default blogSlice.reducer;
export const { setBlogs, appendBlog, likeBlogFrontend } = blogSlice.actions;
