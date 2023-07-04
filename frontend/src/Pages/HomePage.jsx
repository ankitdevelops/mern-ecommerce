import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, clearProducts } from "../features/products/productSlice";
import Hero from "../Components/Hero";
import Collections from "../Components/Collections";
import ProductList from "../Components/ProductList";
import Container from "../Components/Container";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch]);
  return (
    <Container>
      <div className="my-5">
        <Hero />
        <div className="card w-full bg-base-200 shadow-xl mt-5">
          <div className="card-body">
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl">
              Browse By Collections
            </h1>
          </div>
        </div>
        <Collections />
        <div className="card w-full bg-base-200 shadow-xl my-5">
          <div className="card-body">
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl">
              Our Top Selling Products
            </h1>
          </div>
        </div>
        <ProductList products={products} />
      </div>
    </Container>
  );
};

export default HomePage;
