import axios from "axios";

const API_URL = "http://localhost:5000/api/review";

const createReview = async (data) => {
  const id = data.id;
  delete data.id;
  const response = await axios.post(`${API_URL}/${id}`, data, {
    withCredentials: true,
  });

  return response.data;
};

const reviewService = { createReview };
export default reviewService;
