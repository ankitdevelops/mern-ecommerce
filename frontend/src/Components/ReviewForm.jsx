import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addNewReview } from "../features/reviews/reviewSlice";
import Loader from "./Loader";

const ReviewForm = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { status } = useSelector((state) => state.reviews);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      productId: id,
      rating: rating,
      comment: comment,
    };

    if (id && comment && rating) {
      dispatch(addNewReview(data))
        .unwrap()
        .then((review) => {
          console.log(review);
        })
        .catch((error) => console.log(error));
    }
    setComment("");
    setRating(0);
  };

  return (
    <>
      <div className="card bg-base-300 mb-5">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-xl">
                  Write Your Review Here
                </span>
              </label>

              <textarea
                className="textarea"
                placeholder="Write Your Review Here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-xl">Rating</span>
              </label>

              <select
                className="select select-bordered w-full  "
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              <button
                className="btn btn-primary mt-4 w-24"
                type="submit"
                disabled={status === "pending"}
              >
                Summit{" "}
                {status == "pending" && <Loader size={15} color={"#fff"} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewForm;
