import { createSlice } from "@reduxjs/toolkit";

// !Initial State
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  //! Reducers
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    // Logout
    logoutAction: (state) => {
      state.user = null;
    },
  },
});

// Generate the actions
export const { loginAction, logoutAction } = authSlice.actions;
// Generate the reducer
const authReducer = authSlice.reducer;
export default authReducer;
