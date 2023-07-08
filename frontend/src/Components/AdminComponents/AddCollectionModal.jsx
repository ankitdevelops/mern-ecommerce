import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCollection } from "../../features/collection/collectionSlice";
import Loader from "../Loader";

const AddCollectionModal = ({ setShowCollectionAddModal }) => {
  const [collectionName, setCollectionName] = useState("");

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.collection);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: collectionName,
    };

    if (data) {
      dispatch(createCollection(data))
        .unwrap()
        .then((data) => {
          setShowCollectionAddModal(false);
          toast.success(`Collection "${data.name}" created successfully`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  ">
      <div className="bg-base-300 rounded-lg z-10  p-5  mx-auto w-96">
        <h3 className="text-2xl font-semibold">
          Add New Collection
          <hr className="border-slate-700 mt-2" />
          <div className="card ">
            <form action="" onSubmit={handleSubmit}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Collection Name</span>
                </label>

                <input
                  type="text"
                  placeholder="Type here"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  className="input  input-lg  border-slate-700"
                  required
                />
              </div>
              <div className="float-right">
                <button
                  className="btn btn-primary mt-3"
                  type="submit"
                  disabled={status === "pending"}
                >
                  Create Now
                  {status == "pending" && <Loader size={15} color={"#fff"} />}
                </button>
                <label
                  className="btn btn-warning my-2 ms-3"
                  onClick={() => setShowCollectionAddModal(false)}
                >
                  Close
                </label>
              </div>
            </form>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default AddCollectionModal;
