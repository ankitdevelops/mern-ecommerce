import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import SideBar from "../../Components/AdminComponents/SideBar";
import AdminProductList from "../../Components/AdminComponents/AdminProductList";
import UserList from "../../Components/AdminComponents/UserList";
import AddProduct from "../../Components/AdminComponents/AddProduct";

const Dashboard = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />
      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Page content */}
        <main className="flex-1 p-4 bg-base-100">
          {location.pathname === "/admin/dashboard" ? (
            <AdminProductList />
          ) : location.pathname === "/admin/dashboard/users" ? (
            <UserList />
          ) : location.pathname === "/admin/dashboard/add-product" ? (
            <AddProduct />
          ) : (
            <AdminProductList />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
