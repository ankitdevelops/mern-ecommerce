import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  clearProducts,
} from "../../features/products/productSlice";
import { Link } from "react-router-dom";
import ProductEditModal from "./ProductEditModal";
import ProductDeleteModal from "./ProductDeleteModal";

const AdminProductList = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editProductId, setEditProductId] = useState("");
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch]);

  return (
    <div className="overflow-x-auto">
      <Link
        className="btn btn-primary float-right me-10 my-3"
        to={"/admin/dashboard/add-product"}
      >
        Add new Product
      </Link>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Product Name</th>

            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Total Sold</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={product?.photos[0]?.secure_url}
                          alt={product?.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product?.name}</div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>

                <td>
                  {product?.description}
                  <br />
                </td>
                <td>{product?.price}</td>
                <td>{product?.stock}</td>
                <td>{product?.sold}</td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => {
                      setShowEditModal(!showEditModal),
                        setEditProductId(product?._id);
                    }}
                  >
                    Edit
                  </button>{" "}
                  /
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => {
                      setShowDeleteModal(!showDeleteModal),
                        setEditProductId(product?._id);
                    }}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
        </tbody>
        {/* foot */}
      </table>
      {showEditModal && (
        <ProductEditModal
          className="absolute w-full h-full top-0 left-0"
          setShowEditModal={setShowEditModal}
          editProductId={editProductId}
        />
      )}

      {showDeleteModal && (
        <ProductDeleteModal
          className="absolute w-full h-full top-0 left-0"
          setShowDeleteModal={setShowDeleteModal}
          editProductId={editProductId}
        />
      )}
    </div>
  );
};

export default AdminProductList;
