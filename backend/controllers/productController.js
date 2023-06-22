import productModel from "../models/productModel.js";
import asyncHandler from "../services/asyncHandler.js";
import mailHelper from "../utils/mailHelper.js";

const createProduct = asyncHandler(async (req, res) => {
  console.log("Creating Product");
  console.log(req.body);
});

const getProductById = asyncHandler(async (req, res) => {
  console.log("getProductById");
});

const getProductByCollection = asyncHandler(async (req, res) => {
  console.log("getProductByCollection");
});

const getProducts = asyncHandler(async (req, res) => {
  console.log("getProducts");
});

const updateProducts = asyncHandler(async (req, res) => {
  console.log("update product");
});

const deleteProduct = asyncHandler(async (req, res) => {
  console.log("delete product");
});

export {
  createProduct,
  getProductById,
  getProductByCollection,
  updateProducts,
  deleteProduct,
  getProducts,
};
