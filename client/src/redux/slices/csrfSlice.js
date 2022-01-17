import { createSlice } from "@reduxjs/toolkit";

const csrfSlice = createSlice({
  name: "csrf",
  initialState: {
    value: "no-token",
  },
  reducers: {
    setToken(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setToken } = csrfSlice.actions;
export default csrfSlice.reducer;
