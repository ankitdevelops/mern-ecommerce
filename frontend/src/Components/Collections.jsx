import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCollection,
  clearCollection,
} from "../features/collection/collectionSlice";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import Product from "./Product";

const Collections = () => {
  const dispatch = useDispatch();
  const { collections, status } = useSelector((state) => state.collection);

  useEffect(() => {
    dispatch(getAllCollection());
    return () => {
      dispatch(clearCollection());
    };
  }, [dispatch]);

  if (!collections || status === "pending") {
    return (
      <div className="flex justify-center mt-4">
        <Loader size={100} color="#fff" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
        {collections &&
          collections.slice(0, 5).map((collection) => (
            <div
              className="card w-full bg-base-300 shadow-xl "
              key={collection._id}
            >
              <div className="card-body">
                <h2 className="card-title">{collection?.name}</h2>
                <div className="card-actions justify-end">
                  <Link
                    to={`/products/collection/${collection?._id}`}
                    className="btn btn-primary"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}
        <div className="card w-full bg-base-300 shadow-xl ">
          <div className="card-body">
            <h2 className="card-title">All Collections</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Explore</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collections;
