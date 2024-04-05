import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice";
import sellerReducer from "../redux/seller/sellerSlice";
import productReducer from "../redux/product/productSlice";
import eventReducer from "../redux/event/eventSlice";
import cartReducer from "../redux/reducer/cartSlice";
import wishlistReducer from "../redux/wishList/wishListSlice";
import orderReducer from "../redux/order/orderSlice";

export const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    events: eventReducer,
    cart: cartReducer,
    ordered: orderReducer,
    wishlist: wishlistReducer,
  },
});
