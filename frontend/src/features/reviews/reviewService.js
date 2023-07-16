import axios from "axios";

const API_URL = "http://localhost:5000/api/reviews";

const createReview = async (data) => {
  const id = data.productId;
  delete data.productId;
  const response = await axios.post(`${API_URL}/${id}`, data, {
    withCredentials: true,
  });

  return response.data;
};

const getProductReviews = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

const reviewService = { createReview, getProductReviews };
export default reviewService;
