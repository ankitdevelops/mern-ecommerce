import React from "react";
import ReviewForm from "./ReviewForm";

const Review = () => {
  return (
    <div className="card w-full bg-base-200 shadow-xl ">
      <div className="card-body">
        {/* review Form */}
        <ReviewForm />
      </div>
    </div>
  );
};

export default Review;
