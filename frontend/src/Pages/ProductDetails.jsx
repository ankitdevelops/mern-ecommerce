import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Container from "../Components/Container";
import Rating from "../Components/Rating";
import Loader from "../Components/Loader";
import ImageFullScreen from "../Components/ImageFullScreen";
import {
  getSingleProduct,
  clearSingleProduct,
} from "../features/products/productSlice";
import Review from "../Components/Review";

const ProductDetails = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { status, singleProduct: product } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getSingleProduct(id));

    return () => {
      dispatch(clearSingleProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setImages(product.photos);
      setCurrentImage(images[0]);
    }
  }, [product, images]);

  const handleCloseFullScreen = () => {
    setFullScreenImage(null);
  };

  if (!product) {
    return (
      <Container>
        <div className="flex justify-center my-10 h-screen">
          <Loader size={100} color="#fff" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {product && (
        <div className="grid grid-cols-2 gap-10  my-10 ">
          <div className="col-span-2 md:col-span-1 md:order-1">
            <div className="relative mx-3 mt-3 flex max-h-96 overflow-hidden rounded-xl w-full">
              <img
                className="object-cover w-full rounded-xl"
                src={currentImage && currentImage.secure_url}
                alt={product && product.name}
                onClick={() => setFullScreenImage(currentImage.secure_url)}
              />
              {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span> */}
            </div>
            <div className="flex justify-start gap-5 my-5 flex-wrap ">
              {images &&
                images.map((image, index) => (
                  <div
                    className="card bg-base-300 rounded-xl w-24 h-24 overflow-hidden cursor-pointer"
                    key={index}
                    onClick={() => setCurrentImage(image)}
                  >
                    <img
                      src={image.secure_url}
                      alt={product?.name}
                      className="object-cover h-full w-full rounded-xl"
                    />
                  </div>
                ))}
            </div>
            <Review className=" mt-10" />
          </div>
          <div className="col-span-2 md:col-span-1 md:order-2">
            <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product && product.brand}
              </h2>
              <h1 className=" text-3xl lg:text-4xl title-font font-medium mb-1">
                {product && product.name}
              </h1>
              <div className="flex mb-4 items-center">
                <Rating value={product?.averageRating} />{" "}
                <p className="ms-3">
                  <span className="text-xl font-semibold ">
                    {product?.totalReviews}
                  </span>{" "}
                  people reviewed this product
                </p>
              </div>

              <ReactMarkdown>{product && product.description}</ReactMarkdown>

              <div className="flex mt-10 items-center">
                <p>
                  <span className="text-3xl font-bold   ">
                    ₹ {product && product?.price}
                  </span>
                </p>
                <button
                  className="btn btn-primary ms-5 w-44 lg:btn-wide"
                  disabled={product?.stock < 1}
                >
                  {product && product?.stock >= 1
                    ? "Add to Cart"
                    : "Out of Stock"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {fullScreenImage && (
        <ImageFullScreen
          className="absolute w-full h-full top-0 left-0"
          imageUrl={fullScreenImage}
          onClose={handleCloseFullScreen}
        />
      )}
    </Container>
  );
};

export default ProductDetails;
