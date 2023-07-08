import { useDebugValue, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleProduct,
  clearSingleProduct,
  deleteProduct,
} from "../../features/products/productSlice";
import Loader from "../Loader";

const ProductDeleteModal = ({ setShowDeleteModal, editProductId }) => {
  const dispatch = useDispatch();
  const { singleProduct, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getSingleProduct(editProductId));
    return () => {
      dispatch(clearSingleProduct());
    };
  }, [dispatch, editProductId]);

  const handleDeleteBtn = () => {
    dispatch(deleteProduct(editProductId))
      .unwrap()
      .then((data) => {
        toast.success("Product Deleted Successfully");
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.log("Error", error);
        toast.success(error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-base-300 rounded-lg z-10  p-10  mx-auto">
        <p className="text-lead font-semibold">
          Are you sure you want to delete product {singleProduct?.name}
        </p>

        <div className="float-right">
          <button
            className="btn btn-warning my-2 me-3"
            onClick={() => setShowDeleteModal(false)}
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

export default ProductDeleteModal;
