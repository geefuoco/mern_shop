import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSession = createAsyncThunk("order/getSession", async (url) => {
  const response = await fetch(
    `${process.env.REACT_APP_HOSTNAME}:4000/checkout-session?sessionId=${url}`
  );
  return response.json();
});

const orderSlice = createSlice({
  name: "order",
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

export const { setSession } = orderSlice.actions;
export default orderSlice.reducer;
