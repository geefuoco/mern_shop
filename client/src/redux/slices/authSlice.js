import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("auth/user", async () => {
  try {
    const url = `${process.env.REACT_APP_HOSTNAME}:4000/api/user/authorize`;
    const options = {
      credentials: "include",
    };
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    console.error(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: null,
    status: "idle",
    value: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default authSlice.reducer;
