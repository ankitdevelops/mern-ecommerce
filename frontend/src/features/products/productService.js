import axios from "axios";
axios.defaults.withCredentials = true;

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

// const filterProductByPrice = (products, maxPrice) => {
//   return products.filter(function (product) {
//     return parseFloat(product.price) <= parseFloat(maxPrice);
//   });
// };

// function filterProductsByPrice(products, maxPrice) {
//   return products.filter(function (product) {
//     return parseFloat(product.price) <= parseFloat(maxPrice);
//   });
// }

const productService = {
  getAllProducts,
  addNewProduct,
};

export default productService;
