import React from "react";

import { useLocation, useParams } from "react-router-dom";
import SideBar from "../../Components/AdminComponents/SideBar";
import AdminProductList from "../../Components/AdminComponents/AdminProductList";
import UserList from "../../Components/AdminComponents/UserList";
import ProductPhotos from "../../Components/AdminComponents/ProductPhotos";
import Collection from "../../Components/AdminComponents/Collection";

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
          ) : location.pathname ===
            `/admin/dashboard/product/add-photo/${id}` ? (
            <ProductPhotos />
          ) : location.pathname === "/admin/dashboard/collections" ? (
            <Collection />
          ) : (
            <AdminProductList />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
