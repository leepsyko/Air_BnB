// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  user: user || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleSignIn: (state, action) => {
      state.user = action.payload.user;
      state.name = action.payload.name; // Add this line to store the user's name
      localStorage.setItem("currentUser", JSON.stringify(action.payload.user));
    },
    handleSignOut: (state) => {
      state.user = null;
      state.name = null; // Clear the user's name when signing out
      localStorage.removeItem("currentUser");
    },
  },
});

export const { handleSignIn, handleSignOut } = userSlice.actions;

export default userSlice.reducer;
