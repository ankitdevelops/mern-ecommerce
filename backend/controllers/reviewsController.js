import Review from "../models/reviewsModel.js";
import asyncHandler from "../services/asyncHandler.js";
import config from "../config/index.js";
import Product from "../models/productModel.js";

/**
 * @desc Add a new Review
 * @route POST /api/review
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - newly created review object
 * @access Public
 */

const createReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { rating, comment } = req.body;

  if (!rating || !comment) {
    res.status(400);
    throw new Error("Invalid Request");
  }

  const product = await Product.findOne({ _id: id, isActive: true });

  if (!product) {
    res.status(404);
    throw new Error("No Product Found");
  }

  const review = await Review.create({
    rating,
    comment,
    user: req.user,
    product: product,
  });

  if (review) {
    product.reviews.push(review._id);
    await product.save();
    res.status(201).json({
      rating: review.rating,
      comment: review.comment,
      user: req.user,
      isActive: review.isActive,
      _id: review._id,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      __v: review.__v,
    });
  } else {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/**
 * @desc Get review of a product
 * @route GET /api/review
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - all reviews of a product
 * @access Public
 */
const getProductReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id, isActive: true });

  if (!product) {
    res.status(404);
    throw new Error("No Product Found");
  }

  const review = await Review.find({
    product: product._id,
    isActive: true,
  }).populate("user", "name role ");

  if (review) {
    res.status(200).json(review);
  } else {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findOne({ _id: id, isActive: true }).populate(
    "user",
    "name role "
  );

  if (!review) {
    res.status(404);
    throw new Error("No review Found");
  }

  review.isActive = false;

  await review.save();

  res.status(200).json(review);
});

export { createReview, getProductReview, deleteReview };
