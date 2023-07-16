import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
const Rating = ({ value }) => {
  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <FaStar color="#f8e825" />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt color="#f8e825" />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar color="#f8e825" />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt color="#f8e825" />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar color="#f8e825" />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt color="#f8e825" />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar color="#f8e825" />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt color="#f8e825" />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar color="#f8e825" />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt color="#f8e825" />
        ) : (
          <FaRegStar />
        )}
      </span>
      {/* <span className="rating-text">{text && text}</span> */}
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};
export default Rating;
