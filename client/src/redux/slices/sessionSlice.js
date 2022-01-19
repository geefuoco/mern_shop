import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSession = createAsyncThunk(
  "session/getSession",
  async (url) => {
    const response = await fetch(
      `${process.env.REACT_APP_HOSTNAME}:4000/checkout-session?sessionId=${url}`,
      {
        credentials: "include",
      }
    );
    return response.json();
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    status: "idle",
    error: null,
    value: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSession.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(getSession.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;
