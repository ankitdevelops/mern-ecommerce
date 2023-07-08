import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateCollection } from "../../features/collection/collectionSlice";
import Loader from "../Loader";

const EditCollectionModal = ({
  setShowCollectionEditModal,
  singleCollection,
}) => {
  const [collection, setCollection] = useState("");
  const [collectionName, setCollectionName] = useState("");

  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.collection);

  useEffect(() => {
    if (singleCollection) {
      setCollection(singleCollection);
      setCollectionName(singleCollection?.name);
    }
  }, [singleCollection]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: collectionName,
      id: collection?._id,
    };
    if (data) {
      dispatch(updateCollection(data))
        .unwrap()
        .then((data) => {
          toast.success(`${data?.name} updated successfully`);
          setShowCollectionEditModal(false);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  ">
      <div className="bg-base-300 rounded-lg z-10  p-5  mx-auto w-96">
        <h3 className="text-2xl font-semibold">
          Updating Collection
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
                  Update Now
                  {status == "pending" && <Loader size={15} color={"#fff"} />}
                </button>
                <label
                  className="btn btn-warning my-2 ms-3"
                  onClick={() => setShowCollectionEditModal(false)}
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

export default EditCollectionModal;
