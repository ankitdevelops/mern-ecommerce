import Product from "./Product";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-10">
      {products &&
        products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
    </div>
  );
};

export default ProductList;
