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
  },
});

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
export const { setBlogs, appendBlog } = blogSlice.actions;
