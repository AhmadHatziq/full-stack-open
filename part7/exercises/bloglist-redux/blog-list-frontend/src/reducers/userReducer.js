import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      console.log("Setting user: ", action.payload);
      return action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
