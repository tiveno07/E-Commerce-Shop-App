import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const isItemExit = state.cart.find((i) => i?._id === item?._id);
      if (isItemExit) {
        return {
          ...state,
          cart: state.cart.map((i) => (i?._id === isItemExit?._id ? item : i)),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    },

    removeFromCart(state, action) {
      return {
        ...state,
        cart: state.cart.filter((i) => i?._id !== action?.payload?._id),
      };
    },
  },
});

export const { removeFromCart, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
