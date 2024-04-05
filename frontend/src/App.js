import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  HomePage,
  SignupPage,
  ActivationPage,
  ProductPage,
  BestSellingPage,
  EventPage,
  FAQPage,
  ShopInboxPage,
  ProductDetailsPage,
  ProfilePage,
  EventDetailsPage,
  OrderUpdateHandler,
  CheckOutPage,
  ShopWithDrawMoneyPage,
  ShopCreate,
  SellerActivationPage,
  ShopLoginPage,
  TrackOrderPage,
  ShopSettingPage,
  UserInbox,
  ShopAllOrders,
  OrderSuccessPage,
  PaymentPage,
} from "./routes/Routes.js";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ShopHomePage } from "./ShopRoutes";
import { SellerProtectedRoute } from "./routes/SellerProtectedRoute";
import {
  ShopDashboardPage,
  ShopCreatedProduct,
  ShopAllProducts,
  ShopOrderDetails,
  ShopAllEvents,
  ShopAllRefunds,
  ShopAllCoupons,
  ShopCreateEvents,
} from "./routes/ShopRoutes";
import { useDispatch, useSelector } from "react-redux";
import { loadASeller } from "./redux/seller/sellerSlice";
import { getAllTheProduct, getProduct } from "./redux/product/productSlice.js";
import { getAllEvent } from "./redux/event/eventSlice.js";
import { server } from "./server.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { loadAUser } from "./redux/user/userSlice.js";

export const App = () => {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}payment/stripeapikey`);
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    dispatch(getAllTheProduct());
    dispatch(loadASeller());
    dispatch(loadAUser());
    dispatch(getAllEvent());
    getStripeApiKey();
  }, [dispatch]);

  const { isLoading, seller, isSuccess } = useSelector(
    (state) => state?.seller
  );
  const sellers = seller?.seller?._id;

  return (
    <>
      <BrowserRouter>
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route
            path="/shop-create"
            element={<ShopCreate isSuccess={isSuccess} sellers={sellers} />}
          />
          <Route
            path="/shop-login"
            element={
              <ShopLoginPage
                sellers={sellers}
                isLoading={isLoading}
                isSuccess={isSuccess}
              />
            }
          />
          <Route
            path="/dashboard-create-events"
            element={
              <SellerProtectedRoute isSuccess={isSuccess}>
                <ShopCreateEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute isSuccess={isSuccess}>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <SellerProtectedRoute isSuccess={isSuccess}>
                <ShopOrderDetails />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute isSuccess={isSuccess}>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-event"
            element={
              <SellerProtectedRoute isSuccess={isSuccess}>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-refunds"
            element={
              <SellerProtectedRoute isSuccess={isSuccess}>
                <ShopAllRefunds />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute isSuccess={isSuccess}>
                <ShopAllOrders />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-products"
            element={
              <SellerProtectedRoute isSuccess={isSuccess}>
                <ShopCreatedProduct />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute isSuccess={isSuccess}>
                <ShopAllProducts seller={seller} />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute isSuccess={isSuccess}>
                <ShopWithDrawMoneyPage seller={seller} />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupons"
            element={
              <SellerProtectedRoute isSuccess={isSuccess}>
                <ShopAllCoupons seller={seller} />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <SellerProtectedRoute isSuccess={isSuccess}>
                <ShopSettingPage seller={seller} />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-message"
            element={
              <SellerProtectedRoute isSuccess={isSuccess}>
                <ShopInboxPage seller={seller} />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <OrderUpdateHandler />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/track/order/:id"
            element={
              <ProtectedRoute>
                <TrackOrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <UserInbox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckOutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route
            path="/seller/activation/:activation_token"
            element={<SellerActivationPage />}
          />
        </Routes>
        <ToastContainer
          position="bottom-center"
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
          autoClose={5000}
          newestOnTop
        ></ToastContainer>
      </BrowserRouter>
    </>
  );
};
