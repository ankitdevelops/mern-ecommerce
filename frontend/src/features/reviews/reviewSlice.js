import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "./reviewService";

const initialState = {
  review: [],
  status: "",
};

export const addNewReview = createAsyncThunk(
  "review/addNewReview",
  async (data, thunkAPI) => {
    try {
      return await reviewService.createReview();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewReview.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "fulfilled";
      })
      .addCase(addNewReview.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addNewReview.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
