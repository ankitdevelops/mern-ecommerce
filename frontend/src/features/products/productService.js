import axios from "axios";

const API_URL = "http://localhost:5000/api/products/";

const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}`);

  if (response.data) {
    return response.data;
  }
};

const addNewProduct = async (productData) => {
  const response = await axios.post(`${API_URL}`, productData, {
    withCredentials: true,
  });

  return response.data;
};

const addProductPhoto = async (data) => {
  const formData = new FormData();
  formData.append("photo", data.image);
  const response = await axios.post(`${API_URL}${data.id}`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const getSingleProduct = async (productId) => {
  const response = await axios.get(`${API_URL}${productId}`);

  if (response.data) {
    return response.data;
  }
};

const productService = {
  getAllProducts,
  addNewProduct,
  addProductPhoto,
  getSingleProduct,
};

export default productService;
