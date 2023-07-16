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
      return await reviewService.createReview(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const getProductReviews = createAsyncThunk(
  "review/getProductReviews",
  async (id, thunkAPI) => {
    try {
      return await reviewService.getProductReviews(id);
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
    clearReview: (state) => {
      state.review = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewReview.fulfilled, (state, action) => {
        state.review.unshift(action.payload);
        state.status = "fulfilled";
      })
      .addCase(addNewReview.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addNewReview.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.review = action.payload;
        state.status = "fulfilled";
      })
      .addCase(getProductReviews.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getProductReviews.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const { clearReview } = reviewSlice.actions;
export default reviewSlice.reducer;
