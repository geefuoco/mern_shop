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

export const getProduct = createAsyncThunk("products/getProduct", async () => {
  try {
    const response = await fetch(
      `http://192.168.2.239:4000/api${window.location.pathname}`
    );
    return response.json();
  } catch (error) {
    console.log(`Error while fetching Product: ${error}`);
    return error;
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: {
      items: [],
      status: "idle",
      error: null,
    },
    item: {
      item: {},
      status: "idle",
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.items.status = "pending";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.items.items = [...action.payload];
        state.items.status = "succeeded";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.items.error = action.error;
        state.items.status = "failed";
      })
      .addCase(getProduct.pending, (state) => {
        state.item.status = "pending";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.item.item = action.payload;
        state.item.status = "succeeded";
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.item.error = action.error;
        state.item.status = "failed";
      });
  },
});

export const item = (state) => state.products.item.item;
export const items = (state) => state.products.items.items;
export const itemsStatus = (state) => state.products.items.status;
export const itemStatus = (state) => state.products.item.status;
export default productSlice.reducer;
