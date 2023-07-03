import axios from "axios";

const API_URL = "http://localhost:5000/api/products/";

const getAllProducts = async (userData) => {
  const response = await axios.get(`${API_URL}`);

  if (response.data) {
    return response.data;
  }
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
};

export default productService;
