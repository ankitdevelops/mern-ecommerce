import { useState, useEffect } from "react";
import ProductList from "../Components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  clearProducts,
  filterProductsByPrice,
} from "../features/products/productSlice";
import Container from "../Components/Container";
const ProductsPage = () => {
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  // console.log("products", products);

  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch]);

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

export default ProductsPage;
