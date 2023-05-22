import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notificationMessage: null,
    notificationColor: "green",
  },
  reducers: {},
});

export default notificationSlice.reducer;
