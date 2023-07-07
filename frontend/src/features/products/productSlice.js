import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  status: "",
  singleProduct: null,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (productData, thunkAPI) => {
    try {
      return await productService.addNewProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const addProductPhoto = createAsyncThunk(
  "products/addProductPhoto",
  async (data, thunkAPI) => {
    try {
      return await productService.addProductPhoto(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (productId, thunkAPI) => {
    try {
      return await productService.getSingleProduct(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || error.toString()
      );
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
    clearSingleProduct: (state) => {
      state.singleProduct = null;
    },
    filterProductsByPrice: (state, action) => {
      const maxPrice = action.payload;
      state.products = state.products.filter(
        (product) => parseFloat(product.price) >= parseFloat(maxPrice)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "fulfilled";
      })
      .addCase(getProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
        state.status = "fulfilled";
      })
      .addCase(addNewProduct.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addNewProduct.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(addProductPhoto.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.singleProduct.photos.unshift(action.payload);
      })
      .addCase(addProductPhoto.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addProductPhoto.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.singleProduct = action.payload;
      });
  },
});
export const { clearProducts, filterProductsByPrice, clearSingleProduct } =
  productSlice.actions;
export default productSlice.reducer;