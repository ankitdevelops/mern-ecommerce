import { useState } from "react";
import ProductList from "../Components/ProductList";

const ProductsPage = () => {
  const [price, setPrice] = useState(40);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
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
        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage;
