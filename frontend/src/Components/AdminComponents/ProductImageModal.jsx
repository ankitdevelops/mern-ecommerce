import React from "react";

const ProductImageModal = () => {
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
          >
            Confirm
            {status == "pending" && <Loader size={15} color={"#fff"} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductImageModal;
