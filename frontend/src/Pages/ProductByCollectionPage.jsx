import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductByCollection,
  clearProducts,
  filterProductsByPrice,
} from "../features/products/productSlice";
import Loader from "../Components/Loader";
import Container from "../Components/Container";
import ProductList from "../Components/ProductList";

const ProductByCollectionPage = () => {
  const [price, setPrice] = useState(0);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductByCollection(id));
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch, id]);

  if (status === "pending") {
    return (
      <Container>
        <div className="flex justify-center h-screen mt-10">
          <Loader size={100} color={"#fff"} />
        </div>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container>
        <div className="flex justify-center h-screen">
          <h1 className="text-4xl mt-10">No Products Found</h1>
        </div>
      </Container>
    );
  }
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    dispatch(filterProductsByPrice(price));
  };
  return (
    <Container>
      <div className="grid grid-cols-12 my-10">
        <div className="md:col-span-2 px-2 md:block hidden">
          <h2 className="text-xl font-bold mb-4">Filter</h2>
          <div>
            <label className="label text-xl">Price ₹ {price}</label>
            <input
              className="range"
              type="range"
              min={0}
              max="5000"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div className="md:col-span-10 col-span-12  mx-5">
          <ProductList products={products} />
        </div>
      </div>
    </Container>
  );
};

export default ProductByCollectionPage;
