import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import { deleteCollection } from "../../features/collection/collectionSlice";
import { toast } from "react-toastify";
const DeleteCollectionModal = ({
  singleCollection,
  setShowCollectionDeleteModal,
}) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.collection);

  const handleDeleteBtn = () => {
    if (singleCollection) {
      dispatch(deleteCollection(singleCollection?._id))
        .unwrap()
        .then((data) => {
          toast.success(`${singleCollection?.name} deleted successfully`);
          setShowCollectionDeleteModal(false);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-base-300 rounded-lg z-10  p-10  mx-auto">
        <p className="text-lead font-semibold">
          Are you sure you want to delete collection {singleCollection?.name}
        </p>

        <div className="float-right">
          <button
            className="btn btn-warning my-2 me-3"
            onClick={() => setShowCollectionDeleteModal(false)}
          >
            Close
          </button>
          <button
            className="btn btn-primary mt-3"
            disabled={status === "pending"}
            onClick={handleDeleteBtn}
          >
            Confirm
            {status == "pending" && <Loader size={15} color={"#fff"} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCollectionModal;
