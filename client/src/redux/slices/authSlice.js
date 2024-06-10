import { createSlice } from "@reduxjs/toolkit";

// !Initial State
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: null,
  },
  //! Reduces
  reducers: {
    loginAction: (state, action) => {
      state.userAuth = action.payload;
    },
  },
});

// Generate the actions
export const { loginAction } = authSlice.actions;
// Generate the reducer
const authReducer = authSlice.reducer;
export default authReducer;
