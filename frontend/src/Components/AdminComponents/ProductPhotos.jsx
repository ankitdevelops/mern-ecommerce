import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addProductPhoto,
  getSingleProduct,
  clearSingleProduct,
} from "../../features/products/productSlice";
import Loader from "../Loader";

const ProductPhotos = () => {
  const [newImage, setNewImage] = useState([]);
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { status, singleProduct } = useSelector((state) => state.products);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    dispatch(getSingleProduct(id));

    return () => {
      dispatch(clearSingleProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProduct) {
      setImages(singleProduct.photos);
    }
  }, [singleProduct]);

  const handleUpload = () => {
    const data = {
      id: id,
      image: newImage,
    };

    if (newImage.length !== 0) {
      dispatch(addProductPhoto(data, id))
        .unwrap()
        .then((response) => {
          console.log("Image Uploaded Successfully", response);
          setNewImage([]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="flex justify-between">
      <div className="w-9/12">
        <h1 className=" text-3xl lg:text-4xl title-font font-medium mb-1">
          Current Photos
        </h1>
        <div className="flex justify-start gap-5 my-5 flex-wrap ">
          {images &&
            images.map((image, index) => (
              <div
                className="card bg-base-300 rounded-xl w-60 h-60 overflow-hidden cursor-pointer"
                key={index}
              >
                <img
                  src={image?.secure_url}
                  alt={singleProduct?.name}
                  className="object-cover h-full w-full rounded-xl"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="input_field flex flex-col   text-center my-5 w-3/12 mx-auto">
        <label className="text-center">
          <input
            className="text-sm cursor-pointer w-36 hidden"
            type="file"
            required
            accept="image/*"
            id="avatar"
            multiple={false}
            onChange={imageChange}
          />
          {newImage.length === 0 ? (
            <div className="btn">Select New Image</div>
          ) : (
            <>
              <div className="btn">Select New Picture</div>
              <button
                className="btn ms-3 btn-info"
                onClick={handleUpload}
                disabled={status === "pending"}
              >
                Upload{" "}
                {status == "pending" && <Loader size={15} color={"#fff"} />}
              </button>
            </>
          )}
        </label>

        {newImage.length !== 0 && (
          <div className="card bg-base-300 rounded-xl w-60 h-60 overflow-hidden cursor-pointer my-5">
            <img
              src={URL.createObjectURL(newImage)}
              alt="Shoes"
              className="object-cover h-full w-full rounded-xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPhotos;
