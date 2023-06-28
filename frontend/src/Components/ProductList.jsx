import Product from "./Product";

const ProductList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-7 sm:gap-10">
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </div>
  );
};

export default ProductList;
