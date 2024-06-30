// src/redux/courseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  typeSection: "Listening", // Example initial value
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setTypeSection: (state, action) => {
      state.typeSection = action.payload;
    },
  },
});

export const { setTypeSection } = courseSlice.actions;
// Generate the reducer
const courseReducer = courseSlice.reducer;
export default courseReducer;
