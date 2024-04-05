import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "./userService";
import { toast } from "react-toastify";

export const loadAUser = createAsyncThunk("user/loadUser", async (thunkAPI) => {
  try {
    return await userService.loadUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const UpdateAddresses = createAsyncThunk(
  "user/updateUserAddress",
  async (data, thunkAPI) => {
    try {
      return await userService.UpdateUserAddress(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const DeleteAddresses = createAsyncThunk(
  "user/deleteAddress",
  async (id, thunkAPI) => {
    try {
      return await userService.deleteUserAddress(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  loading: false,
  addressLoading: false,
  message: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload;
        if (state.isSuccess) {
          toast.success("User successfully added");
        }
      })
      .addCase(loadAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(UpdateAddresses.pending, (state) => {
        state.addressLoading = true;
      })
      .addCase(UpdateAddresses.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
        if (state.isSuccess) {
          toast.success("User Address Updated Successfully");
        }
      })
      .addCase(UpdateAddresses.rejected, (state, action) => {
        state.addressLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(DeleteAddresses.pending, (state) => {
        state.addressLoading = true;
      })
      .addCase(DeleteAddresses.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
        if (state.isSuccess) {
          toast.success("User Address Deleted Successfully");
        }
      })
      .addCase(DeleteAddresses.rejected, (state, action) => {
        state.addressLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default userSlice.reducer;
