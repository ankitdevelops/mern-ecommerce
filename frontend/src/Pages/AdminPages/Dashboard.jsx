import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import SideBar from "../../Components/AdminComponents/SideBar";
import AdminProductList from "../../Components/AdminComponents/AdminProductList";
import UserList from "../../Components/AdminComponents/UserList";
import AddProduct from "../../Components/AdminComponents/AddProduct";
import ProductPhotos from "../../Components/AdminComponents/ProductPhotos";

const Dashboard = () => {
  const location = useLocation();
  const { id } = useParams();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />
      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Page content */}
        <main className="flex-1 p-4 bg-base-100 overflow-auto scrollbar-hide">
          {location.pathname === "/admin/dashboard" ? (
            <AdminProductList />
          ) : location.pathname === "/admin/dashboard/users" ? (
            <UserList />
          ) : location.pathname === "/admin/dashboard/add-product" ? (
            <AddProduct />
          ) : location.pathname ===
            `/admin/dashboard/product/add-photo/${id}` ? (
            <ProductPhotos />
          ) : (
            <AdminProductList />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
