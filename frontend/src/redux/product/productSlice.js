import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { toast } from "react-toastify";

export const createAProduct = createAsyncThunk(
  "product/create-Product",
  async (newForm, thunkAPI) => {
    try {
      return await productService.createProduct(newForm);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/get-a-Product",
  async (id, thunkAPI) => {
    try {
      return await productService.getAProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllTheProduct = createAsyncThunk(
  "product/get-all-Product",
  async (thunkAPI) => {
    try {
      return await productService.getAllProduct();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAProduct = createAsyncThunk(
  "product/delete-Product",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
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

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
        if (state.isSuccess) {
          toast.success("Product successfully Created");
        }
      })
      .addCase(createAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getaproduct = action.payload;
        if (state.isSuccess) {
          toast.success("Got Single Product successfully");
        }
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteproduct = action.payload;
        if (state.isSuccess) {
          toast.success("Deleted Product successfully");
        }
      })
      .addCase(deleteAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getAllTheProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTheProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allProducts = action.payload;
        if (state.isSuccess) {
          toast.success("Got All Product successfully");
        }
      })
      .addCase(getAllTheProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default productSlice.reducer;
