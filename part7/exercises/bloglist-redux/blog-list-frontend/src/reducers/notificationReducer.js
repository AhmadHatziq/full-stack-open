import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notificationMessage: null,
    notificationColor: "green",
  },
  reducers: {
    // Set the notification message string
    setNotificationMessage(state, action) {
      state.notificationMessage = action.payload;
    },

    // Set the notification color value
    setNotificationColor(state, action) {
      state.notificationColor = action.payload;
    },
  },
});

export default notificationSlice.reducer;
export const { setNotificationMessage, setNotificationColor } =
  notificationSlice.actions;
