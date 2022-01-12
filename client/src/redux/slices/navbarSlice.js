import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navMenu",
  initialState: {
    value: false,
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = navbarSlice.actions;

export default navbarSlice.reducer;
