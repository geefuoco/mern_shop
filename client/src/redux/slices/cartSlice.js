import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = `${process.env.REACT_APP_HOSTNAME}:4000/api/cart/`;

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const response = await fetch(url, { credentials: "include" });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
});

const calculateTotal = (arr) => {
  try {
    return arr.reduce((pre, cur) => {
      return pre + cur.price;
    }, 0);
  } catch (error) {
    console.error(`Error calculating price total: ${error}`);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    status: "idle",
    error: null,
    items: {
      items: [],
    },
    price: {
      total: 0,
    },
    quantity: {
      quantity: 0,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.items.items = [...action.payload];
        state.quantity.quantity = action.payload.length;
        state.price.total = calculateTotal(action.payload);
        state.status = "succeeded";
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const quantity = (state) => state.cart.quantity.quantity;
export const price = (state) => state.cart.price.total;
export const cartStatus = (state) => state.cart.status;
export const items = (state) => state.cart.items.items;
export default cartSlice.reducer;
