import Product from "../models/productModel.js";
import asyncHandler from "../services/asyncHandler.js";
import mailHelper from "../utils/mailHelper.js";
import config from "../config/index.js";
import formidable from "formidable";
import fs from "fs";
import cloudinary from "cloudinary";
import Mongoose from "mongoose";
import Collection from "../models/collectionModel.js";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file.photos.filepath,
      { folder: "ecom/products" },
      (error, result) => {
        if (error) {
          reject(
            new Error(error.message || "Something went wrong while uploading")
          );
        } else {
          const data = {
            secure_url: result.secure_url,
          };
          resolve(data);
        }
      }
    );
  });
};

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, brand, collectionId, price, stock } = req.body;

  if (!name || !description || !brand || !collectionId || !price || !stock) {
    res.status(400);
    throw new Error("all fields are required");
  }

  const collection = await Collection.findOne({ _id: collectionId });

  if (!collection) {
    res.status(400);
    throw new Error("Collection not found");
  }

  const product = await Product.create({
    name,
    description,
    brand,
    collection,
    price,
    stock,
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

const addProductPhotos = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;

  const form = formidable({ multiples: false, keepExtensions: true });
  form.parse(req, async function (err, fields, files) {
    if (err) {
      res.status(500);
      throw new Error(err.message || "Something went wrong");
    }

    if (!productId) {
      res.status(400);
      throw new Error("productID is required");
    }

    const product = await Product.findOne({ _id: productId });

    if (product && files) {
      const data = await cloudinary.v2.uploader.upload(
        files.photo[0].filepath,
        { folder: `teeVibe/product/${productId}/` },
        (error, result) => {
          if (error) {
            throw new Error(error.message || "Something went wrong");
          }

          return result.secure_url;
        }
      );

      if (data) {
        product.photos.push({ secure_url: data.secure_url });
        product.save();
        res.status(200).json({
          product,
        });
      }
    }
  });
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
  addProductPhotos,
};
