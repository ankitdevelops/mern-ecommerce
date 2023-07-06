import axios from "axios";

const API_URL = "http://localhost:5000/api/collection/";

const getAllCollection = async () => {
  const response = await axios.get(`${API_URL}`);

  if (response.data) {
    return response.data;
  }
};

const collectionService = { getAllCollection };

export default collectionService;
