import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

export default store;
