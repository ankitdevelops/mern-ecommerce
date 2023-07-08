import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCollection,
  clearCollection,
} from "../../features/collection/collectionSlice";

import Loader from "../Loader";
import AddCollectionModal from "./AddCollectionModal";
import EditCollectionModal from "./EditCollectionModal";

const Collection = () => {
  const dispatch = useDispatch();

  const [singleCollection, setSingleCollection] = useState("");
  const [showCollectionAddModal, setShowCollectionAddModal] = useState(false);
  const [showCollectionEditModal, setShowCollectionEditModal] = useState(false);

  const { collections } = useSelector((state) => state.collection);

  useEffect(() => {
    dispatch(getAllCollection());
    return () => {
      dispatch(clearCollection());
    };
  }, [dispatch]);

  if (!collections) {
    return (
      <div className="flex justify-center my-10 h-screen">
        <Loader size={100} color="#fff" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <button
        className="btn btn-primary float-right me-10 my-3"
        onClick={() => setShowCollectionAddModal(!showCollectionAddModal)}
      >
        Add new Collection
      </button>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>S.NO.</th>
              <th>Collection Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {collections &&
              collections.map((collection, index) => (
                <tr key={collection?._id}>
                  <th>{index + 1}</th>
                  <td>{collection?.name}</td>
                  <td>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => {
                        setSingleCollection(collection);
                        setShowCollectionEditModal(!showCollectionEditModal);
                      }}
                    >
                      Edit
                    </button>{" "}
                    /<button className="btn btn-ghost btn-xs">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showCollectionAddModal && (
        <AddCollectionModal
          className="absolute w-full h-full top-0 left-0"
          setShowCollectionAddModal={setShowCollectionAddModal}
          singleCollection={singleCollection}
        />
      )}

      {showCollectionEditModal && (
        <EditCollectionModal
          className="absolute w-full h-full top-0 left-0"
          setShowCollectionEditModal={setShowCollectionEditModal}
          singleCollection={singleCollection}
        />
      )}
    </div>
  );
};

export default Collection;
