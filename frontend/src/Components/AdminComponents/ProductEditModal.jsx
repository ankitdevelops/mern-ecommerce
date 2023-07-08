import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllCollection,
  clearCollection,
} from "../../features/collection/collectionSlice";
import {
  getSingleProduct,
  clearSingleProduct,
  editProduct,
} from "../../features/products/productSlice";
import Loader from "../Loader";
import { toast } from "react-toastify";

const ProductEditModal = ({ setShowEditModal, editProductId }) => {
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [currentCollection, setCurrentCollection] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const { collections } = useSelector((state) => state.collection);
  const { singleProduct, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllCollection());
    return () => {
      dispatch(clearCollection());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSingleProduct(editProductId));
    return () => {
      dispatch(clearSingleProduct());
    };
  }, [dispatch, editProductId]);

  useEffect(() => {
    if (singleProduct) {
      setProductName(singleProduct.name);
      setBrandName(singleProduct.brand);
      setPrice(singleProduct.price);
      setDescription(singleProduct.description);
      setStock(singleProduct.stock);
      setCurrentCollection(singleProduct.collectionId);
    }
  }, [singleProduct]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name: productName,
      description: description,
      brand: brandName,
      price: parseFloat(price),
      stock: parseFloat(stock),
      collectionId: currentCollection,
      productId: editProductId,
    };

    console.log(productData);
    dispatch(editProduct(productData))
      .unwrap()
      .then((product) => {
        toast.success(`${product?.name} updated successfully`);
        setShowEditModal(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  if (!singleProduct) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 ">
        <div className="bg-base-300 p-4 rounded-lg z-10 w-6/12  mx-auto">
          <h3 className="text-3xl font-semibold">
            Editing Product {singleProduct?.name}
          </h3>
          <hr className="border-slate-700 mt-2" />
          <div className="flex justify-center my-10 h-6/12">
            <Loader size={100} color="#fff" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-base-300 p-4 rounded-lg z-10 w-6/12  mx-auto">
        <h3 className="text-3xl font-semibold">Editing Product</h3>
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
                value={currentCollection}
                onChange={(e) => {
                  console.log(e.target.value);
                  setCurrentCollection(e.target.value);
                }}
              >
                {collections &&
                  collections.map((collection) => (
                    <option
                      key={collection?._id}
                      value={collection?._id}
                      defaultValue={
                        currentCollection &&
                        currentCollection === collection?._id
                      }
                    >
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
          {/* <p className="mt-2 lead">Upload New Photos</p> */}
          <div className="float-right">
            <button
              className="btn btn-primary mt-3"
              type="submit"
              disabled={status === "pending"}
            >
              Update Now
              {status == "pending" && <Loader size={15} color={"#fff"} />}
            </button>
            <label
              className="btn btn-warning my-2 ms-3"
              onClick={() => setShowEditModal(false)}
            >
              Close
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
