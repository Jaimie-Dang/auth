import { createSlice } from "@reduxjs/toolkit";

// !Initial State
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  //! Reduces
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Generate the actions
export const { loginAction } = authSlice.actions;
// Generate the reducer
const authReducer = authSlice.reducer;
export default authReducer;
