import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getOrder = createAsyncThunk("order/getOrder", async () => {
  try {
    const url = `${process.env.REACT_APP_HOSTNAME}:4000/api/user/orders`;
    const response = await fetch(url, { credentials: "include" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    error: null,
    status: "idle",
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload.orders;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default orderSlice.reducer;
