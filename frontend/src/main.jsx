import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Login from "./Pages/Login.jsx";
import ProductsPage from "./Pages/ProductsPage.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import AdminRoute from "./Components/AdminRoute.jsx";
import Dashboard from "./Pages/AdminPages/Dashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      {/* Admin Routes */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard/add-product" element={<Dashboard />} />
        <Route path="/admin/dashboard/users" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
