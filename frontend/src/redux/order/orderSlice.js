import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { orderService } from "./orderService";

export const getUserOrder = createAsyncThunk(
  "order/getOrder",
  async (userId, thunkAPI) => {
    try {
      return await orderService.getAllOrdersOfUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserShop = createAsyncThunk(
  "order/getOrderShop",
  async (shopId, thunkAPI) => {
    try {
      return await orderService.getAllOrdersShop(shopId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.ordered = action.payload;
        if (state.isSuccess) {
          toast.success("Order successfullly completed");
        }
      })
      .addCase(getUserOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        if (state.isError) {
          toast.error("Order Failed");
        }
      })
      .addCase(getUserShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.shoporder = action.payload;
        if (state.isSuccess) {
          toast.success("Shop Order completed");
        }
      })
      .addCase(getUserShop.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        if (state.isError) {
          toast.error("Shop Order Failed");
        }
      });
  },
});

export default orderSlice.reducer;
