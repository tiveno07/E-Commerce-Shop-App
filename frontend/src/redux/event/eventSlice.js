import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { eventService } from "./eventService";
import { toast } from "react-toastify";

export const createAEvent = createAsyncThunk(
  "event/event-Product",
  async (newForm, thunkAPI) => {
    try {
      return await eventService.eventProduct(newForm);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAEvent = createAsyncThunk(
  "event/get-Events",
  async (id, thunkAPI) => {
    try {
      return await eventService.getAllEvents(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllEvent = createAsyncThunk(
  "event/get-all-Events",
  async (thunkAPI) => {
    try {
      return await eventService.getAllTheEvents();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAEvent = createAsyncThunk(
  "event/delete-Event",
  async (id, thunkAPI) => {
    try {
      return await eventService.deleteEvent(id);
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
  name: "event",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.newEvent = action.payload;
        if (state.isSuccess) {
          toast.success("Event successfully Created");
        }
      })
      .addCase(createAEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getAEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getEvent = action.payload;
        if (state.isSuccess) {
          toast.success("Event successfully Got");
        }
      })
      .addCase(getAEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteAEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteEvent = action.payload;
        if (state.isSuccess) {
          toast.success("Event Deleted successfully");
        }
      })
      .addCase(deleteAEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getAllEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allEvent = action.payload;
        if (state.isSuccess) {
          toast.success("All Event Gotten successfully");
        }
      })
      .addCase(getAllEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default productSlice.reducer;
