import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  loginUser,
};

export default authService;
