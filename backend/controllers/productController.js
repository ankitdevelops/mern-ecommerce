import cloudinary from "cloudinary";
import formidable from "formidable";

import asyncHandler from "../services/asyncHandler.js";
import Collection from "../models/collectionModel.js";
import config from "../config/index.js";
import Product from "../models/productModel.js";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

/**
 * @desc Add a new Product
 * @route POST /api/products
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - newly created product
 * @access Admin or staff
 */
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
    collectionId: collection,
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

/**
 * @desc Add Photos to the product
 * @route POST /api/products/:productId
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - product with the image urls.
 * @access Admin or staff
 */
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

    if (!product) {
      res.status(404).json({
        message: "No Product Found",
      });
    }

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
        product.photos.push({
          secure_url: data.secure_url,
          public_id: data.public_id,
        });
        product.save();
        res.status(200).json({
          secure_url: data.secure_url,
          public_id: data.public_id,
          productId: product._id,
        });
      }
    }
  });
});

/**
 * @desc access single product by productId
 * @route GET /api/products/:productId
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - a single product detail
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;

  if (!productId) {
    res.status(400);
    throw new Error("Invalid request");
  }

  const product = await Product.findOne({
    _id: productId,
    isActive: true,
  }).populate("reviews");

  const reviews = product?.reviews;
  const sumOfRatings = reviews.reduce((sum, item) => sum + item.rating, 0);
  const reviewsNumber = reviews.length;
  const averageRating = Math.ceil(sumOfRatings / reviewsNumber);

  if (product) {
    res.status(200).json({
      _id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      sold: product.sold,
      brand: product.brand,
      collectionId: product.collectionId,
      isActive: product.isActive,
      photos: product.photos,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      averageRating: averageRating,
      totalReviews: reviewsNumber,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
});

/**
 * @desc access all products of a collection
 * @route GET /api/products/:collectionId
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - all products of a collection
 * @access Public
 */
const getProductByCollection = asyncHandler(async (req, res) => {
  const { id: collectionId } = req.params;

  const collection = await Collection.findOne({
    _id: collectionId,
    isActive: true,
  });

  if (!collection) {
    return res.status(404).json({ error: "Collection not found" });
  }

  const products = await Product.find({
    collectionId: collection._id,
    isActive: true,
  });

  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({
      error: "no products found",
    });
  }
});

/**
 * @desc access all products from db
 * @route GET /api/products/
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - all products
 * @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true });
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({
      error: "no product found",
    });
  }
});

/**
 * @desc update a product
 * @route PUT /api/products/:productId
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - updated product
 * @access Admin or Staff
 */
const updateProductInfo = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;
  const { name, price, description, stock, brand } = req.body;

  const product = await Product.findOne({ _id: productId, isActive: true });

  if (!product) {
    res.status(404).json({ error: "no product found" });
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.stock = stock;
  product.brand = brand;

  await product.save();

  res.status(200).json(product);
});

/**
 * @desc controller for deleting product
 * @route DELETE /api/products/:productId
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - 204 on successful deletion
 * @access Admin or Staff
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId, isActive: true });

  if (!product) {
    res.status(404).json({ error: "Product not found" });
  }

  // Deactivate the product by setting isActive to false
  product.isActive = false;
  await product.save();

  res.status(200).json({ message: "product deleted successfully" });
});

/**
 * @desc controller for deleting photo of a product to update new one
 * @route GET /api/products/image/delete
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - 200 in case of successful deletion
 * @access Admin or Staff
 */
const deleteUploadedProductPhotos = asyncHandler(async (req, res) => {
  const { imageId } = req.body;

  if (!imageId) {
    res.status(400).json({ error: "invalid request" });
  }

  await cloudinary.v2.uploader
    .destroy(imageId, {
      resource_type: "image",
    })
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(500).json(err));
});

export {
  createProduct,
  getProductById,
  getProductByCollection,
  updateProductInfo,
  deleteProduct,
  getProducts,
  addProductPhotos,
  deleteUploadedProductPhotos,
};
