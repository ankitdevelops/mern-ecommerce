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

export const createCollection = createAsyncThunk(
  "collection/createCollection",
  async (data, thunkAPI) => {
    try {
      return await collectionService.createCollection(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const updateCollection = createAsyncThunk(
  "collection/updateCollection",
  async (data, thunkAPI) => {
    try {
      return await collectionService.updateCollection(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const deleteCollection = createAsyncThunk(
  "collection/deleteCollection",
  async (id, thunkAPI) => {
    try {
      return await collectionService.deleteCollection(id);
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
    builder
      .addCase(getAllCollection.fulfilled, (state, action) => {
        state.collections = action.payload;
        state.status = "fulfilled";
      })
      .addCase(getAllCollection.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllCollection.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.collections.push(action.payload);
        state.status = "fulfilled";
      })
      .addCase(createCollection.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createCollection.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        const updatedCollection = action.payload;
        const index = state.collections.findIndex(
          (collection) => collection._id === updatedCollection._id
        );

        if (index !== -1) {
          state.collections[index] = updatedCollection;
        }
        state.status = "fulfilled";
      })
      .addCase(updateCollection.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(updateCollection.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.collections = state.collections.filter(
          (collection) => collection._id !== action.payload
        );
        state.status = "fulfilled";
      });
  },
});
export const { clearCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
