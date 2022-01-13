import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await fetch(`http://192.168.2.239:4000/api/products/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(`Error while fetching Products: ${error}`);
      return error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log("Fetched successfully");
        state.items = [...action.payload];
        state.status = "succeeded";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = action.error;
        state.status = "failed";
      });
  },
});

export const items = (state) => state.products.items;
export const itemsStatus = (state) => state.products.status;
export default productSlice.reducer;
