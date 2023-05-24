import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, users: [] },
  reducers: {
    setUser(state, action) {
      console.log("Setting user: ", action.payload);
      const userToSet = action.payload;
      const newState = { ...state, user: userToSet };
      return newState;
    },

    setUsers(state, action) {
      const users = action.payload;
      const newState = { ...state, users: users };
      return newState;
    },
  },
});

// Obtains data from the backend
export const initializeUsers = () => {
  return async (dispatch) => {
    const usersFromBackend = await userService.getAll();
    dispatch(setUsers(usersFromBackend));
  };
};

export default userSlice.reducer;
export const { setUser, setUsers } = userSlice.actions;
