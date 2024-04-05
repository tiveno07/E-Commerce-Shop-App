import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    addToWishList(state, action) {
      const item = action.payload;
      const isItemExit = state.wishlist.find((i) => i?._id === item?._id);
      if (isItemExit) {
        return {
          ...state,
          wishlist: state.wishlist.map((i) =>
            i?._id === isItemExit?._id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, item],
        };
      }
    },

    removeFromWishlist(state, action) {
      return {
        ...state,
        wishlist: state.wishlist.filter((i) => i?._id !== action.payload?._id),
      };
    },
  },
});

export const { removeFromWishlist, addToWishList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
