import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import collectionReducer from "../features/collection/collectionSlice";
import reviewReducer from "../features/reviews/reviewSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    collection: collectionReducer,
    reviews: reviewReducer,
  },
});

export default store;
