import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  clearProducts,
} from "../../features/products/productSlice";
import { Link } from "react-router-dom";

const AdminProductList = () => {
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
                  <button className="btn btn-ghost btn-xs">Delete</button>
                </th>
              </tr>
            ))}
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
};

export default AdminProductList;
