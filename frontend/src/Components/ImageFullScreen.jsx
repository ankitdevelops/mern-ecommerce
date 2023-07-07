import React from "react";

const ImageFullScreen = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-base-300 p-4 rounded-lg z-10 ">
        {/* <button className="btn btn-warning my-2 " onClick={onClose}>
          Close
        </button> */}
        <div className="image-container flex justify-center items-center">
          <img
            src={imageUrl}
            alt="Full-screen"
            onClick={onClose}
            className="w-auto h-auto rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageFullScreen;
