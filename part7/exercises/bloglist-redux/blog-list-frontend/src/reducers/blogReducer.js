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
  },
});

// Obtains data from the backend
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogsFromBackend = await blogService.getAll();
    dispatch(setBlogs(blogsFromBackend));
  };
};

export default blogSlice.reducer;
export const { setBlogs } = blogSlice.actions;
