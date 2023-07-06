import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import collectionService from "./collectionService";

const initialState = {
  collections: [],
  status: "",
};

export const getAllCollection = createAsyncThunk(
  "collection/getAllCollection",
  async (_, thunkAPI) => {
    try {
      return await collectionService.getAllCollection();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    clearCollection: (state) => {
      state.collections = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCollection.fulfilled, (state, action) => {
      state.collections = action.payload;
      state.status = "fulfilled";
    });
  },
});
export const { clearCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
