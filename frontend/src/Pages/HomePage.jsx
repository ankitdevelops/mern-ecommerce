import React from "react";
import Hero from "../Components/Hero";
import Collections from "../Components/Collections";
import ProductList from "../Components/ProductList";

const HomePage = () => {
  return (
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
      <ProductList />
    </div>
  );
};

export default HomePage;
