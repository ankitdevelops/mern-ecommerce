import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData, {
    withCredentials: true,
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  loginUser,
  registerUser,
};

export default authService;
