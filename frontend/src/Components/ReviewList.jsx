import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductReviews,
  clearReview,
} from "../features/reviews/reviewSlice";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import Rating from "./Rating";
const ReviewList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { status, review } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getProductReviews(id));
    return () => {
      dispatch(clearReview());
    };
  }, [dispatch, id]);

  if (status === "pending") {
    return (
      <div className="flex justify-center">
        <Loader size={100} color="#fff" />
      </div>
    );
  }

  if (!review || review.length === 0) {
    return (
      <div className="flex justify-center">
        <p>No Review Found, Be first one to review this product</p>
      </div>
    );
  }

  return (
    <ul>
      {review &&
        review.map((reviewItem) => (
          <li className="card bg-base-300  mb-3" key={reviewItem?._id}>
            <div className="card-body">
              <div className="flex items-center justify-between ">
                <div className="flex items-center">
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                      <span className="text-3xl uppercase">
                        {reviewItem?.user.name[0].toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ms-5">
                    <p>{reviewItem?.user?.name}</p>
                    <p>{reviewItem?.createdAt}</p>
                  </div>
                </div>
                <div className="float-right ">
                  <Rating value={reviewItem?.rating} />
                </div>
              </div>
              <div className="mt-3 mb-2">{reviewItem?.comment}</div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ReviewList;
