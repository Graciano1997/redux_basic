import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true
}

export const getCartItem = createAsyncThunk('cart/getCartItems', async () => {
  try {
    // console.log(thunkAPI.dispatch(openModal()));
    const resp = await axios(url);
    return resp.data;
  } catch (err) {
    console.log('error');
  }
  //   return fetch(url)
  // .then(resp=>resp.json())
  // .catch(error=>console.log(error))
})

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount -= 1;
    },
    calculateTotals: (state) => {
      let total = 0;
      let amount = 0;
      state.cartItems.forEach(item => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    }
  },
  extraReducers: {
    [getCartItem.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItem.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload
    },
    [getCartItem.rejected]: (state) => {
      state.isLoading = false;
    },
  }
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;