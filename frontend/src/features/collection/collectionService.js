import axios from "axios";

const API_URL = "http://localhost:5000/api/collection/";

const getAllCollection = async () => {
  const response = await axios.get(`${API_URL}`);

  if (response.data) {
    return response.data;
  }
};

const createCollection = async (data) => {
  const response = await axios.post(`${API_URL}`, data, {
    withCredentials: true,
  });

  if (response.data) {
    return response.data;
  }
};

const updateCollection = async (data) => {
  const id = data.id;
  delete data.id;

  const response = await axios.put(`${API_URL}${id}`, data, {
    withCredentials: true,
  });

  if (response.data) {
    return response.data;
  }
};

const collectionService = {
  getAllCollection,
  createCollection,
  updateCollection,
};

export default collectionService;
