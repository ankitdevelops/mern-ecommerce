import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewProduct } from "../../features/products/productSlice";
import {
  getAllCollection,
  clearCollection,
} from "../../features/collection/collectionSlice";
import Loader from "../Loader";
import { toast } from "react-toastify";

const ProductAddModal = ({ setShowProductAddModal }) => {
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [collection, setCollection] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.products);
  const { collections } = useSelector((state) => state.collection);

  useEffect(() => {
    dispatch(getAllCollection());
    return () => {
      dispatch(clearCollection());
    };
  }, [dispatch]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name: productName,
      description: description,
      brand: brandName,
      price: price,
      stock: stock,
      collectionId: collection,
    };

    dispatch(addNewProduct(productData))
      .unwrap()
      .then((product) => {
        setShowProductAddModal(false);
        toast.success(`${product?.name} added successfully`);
      })
      .catch((error) => {
        console.log("Error", error);
      });
    setBrandName("");
    setCollection("");
    setProductName("");
    setPrice("");
    setStock("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-base-300 p-4 rounded-lg z-10 w-6/12  mx-auto">
        <h3 className="text-3xl font-semibold">Adding New Product</h3>
        <hr className="border-slate-700 mt-2" />
        <form action="" className="w-full mt-2" onSubmit={handleFormSubmit}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>

            <input
              type="text"
              placeholder="Type here"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="input  input-lg  border-slate-700"
              required
            />
          </div>
          <div className="w-full flex gap-4">
            <div className="form-control w-6/12">
              <label className="label">
                <span className="label-text">Brand Name</span>
              </label>

              <input
                type="text"
                placeholder="Type here"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="input  input-lg  border-slate-700"
                required
              />
            </div>
            <div className="form-control w-6/12">
              <label className="label">
                <span className="label-text">Price</span>
              </label>

              <input
                type="text"
                placeholder="Type here"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input  input-lg  border-slate-700"
                required
              />
            </div>
          </div>
          <div className="w-full flex gap-4">
            <div className="form-control w-6/12">
              <label className="label">
                <span className="label-text">Stock</span>
              </label>

              <input
                type="number"
                placeholder="Type here"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="input  input-lg  border-slate-700"
                required
              />
            </div>

            <div className="form-control w-6/12">
              <label className="label">
                <span className="label-text">
                  Select Collection (not handled in backend)
                </span>
              </label>

              <select
                className="select input-lg w-full border-slate-700"
                value={collection}
                onChange={(e) => {
                  setCollection(e.target.value);
                }}
              >
                {collections &&
                  collections.map((collection) => (
                    <option key={collection?._id} value={collection._id}>
                      {collection.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <MDEditor
              height={300}
              value={description}
              onChange={setDescription}
              className="w-full"
              required
            />
          </div>
          <p className="mt-2 lead">Upload New Photos</p>
          <div className="float-right">
            <button
              className="btn btn-primary mt-3"
              type="submit"
              disabled={status === "pending"}
            >
              Add Now
              {status == "pending" && <Loader size={15} color={"#fff"} />}
            </button>
            <label
              className="btn btn-warning my-2 ms-3"
              onClick={() => setShowProductAddModal(false)}
            >
              Close
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAddModal;
