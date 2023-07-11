import React from "react";

const ReviewForm = () => {
  return (
    <>
      <form action="">
        <div className="form-control ">
          <label className="label">
            <span className="label-text text-xl">Write Your Review Here</span>
          </label>

          <textarea
            className="textarea"
            placeholder="Write Your Review Here"
          ></textarea>
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-xl">Rating</span>
          </label>

          <select className="select select-bordered w-full ">
            <option value="">Select...</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
          <button className="btn btn-primary mt-4 w-24">Summit</button>
        </div>
      </form>
    </>
  );
};

export default ReviewForm;
