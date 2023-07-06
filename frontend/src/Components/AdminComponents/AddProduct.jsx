import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewProduct } from "../../features/products/productSlice";
import {
  getAllCollection,
  clearCollection,
} from "../../features/collection/collectionSlice";
import Loader from "../Loader";

const AddProduct = () => {
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

  // useEffect(() => {
  //   if (collectionList) {
  //     setCollection(collectionList);
  //   }
  // }, [collectionList]);

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
        console.log(`${product.name} Added To the Stock`);
        navigate(`/admin/dashboard/product/add-photo/${product._id}`);
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
    <form action="" className="w-full" onSubmit={handleFormSubmit}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Product Name</span>
        </label>

        <input
          type="text"
          placeholder="Type here"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="input  input-lg w-10/12 border-slate-700"
          required
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Brand Name</span>
        </label>

        <input
          type="text"
          placeholder="Type here"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className="input  input-lg w-10/12 border-slate-700"
          required
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Price</span>
        </label>

        <input
          type="text"
          placeholder="Type here"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input  input-lg w-10/12 border-slate-700"
          required
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Stock</span>
        </label>

        <input
          type="number"
          placeholder="Type here"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="input  input-lg w-10/12 border-slate-700"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Select Collection</span>
        </label>

        <select
          className="select input-lg w-10/12 border-slate-700"
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
        >
          <option disabled defaultValue>
            Choose Collection
          </option>
          {collections &&
            collections.map((collection) => (
              <option key={collection?._id} value={collection._id}>
                {collection.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Product Description</span>
        </label>
        <MDEditor
          height={400}
          value={description}
          onChange={setDescription}
          className="w-10/12"
          required
        />
      </div>
      <button
        className="btn btn-primary mt-3"
        type="submit"
        disabled={status === "pending"}
      >
        Add Now {status == "pending" && <Loader size={15} color={"#fff"} />}
      </button>
    </form>
  );
};

export default AddProduct;
