import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sellerService } from "./sellerService";
import { toast } from "react-toastify";

export const loadASeller = createAsyncThunk(
  "seller/load-Seller",
  async (thunkAPI) => {
    try {
      return await sellerService.loadSeller();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadASeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadASeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.seller = action.payload;
        if (state.isSuccess) {
          toast.success("Seller successfully added");
        }
      })
      .addCase(loadASeller.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default sellerSlice.reducer;
