import Collection from "../models/collectionModel.js";
import asyncHandler from "../services/asyncHandler.js";

/**
 * @desc Create a new collection
 * @route POST /api/collection
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - newly created collection
 * @access Admin or staff
 */
const createCollection = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Invalid Request");
  }
  const collection = await Collection.create({
    name,
  });

  if (collection) {
    res.status(200).json({
      success: true,
      message: "Collection created Successfully",
      collection,
    });
  } else {
    res.status(500);
    throw new Error("something went wrong");
  }
});

/**
 * @desc update collection
 * @route PUT /api/collection
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - updated collection
 * @access Admin or staff
 */

const updateCollection = asyncHandler(async (req, res) => {
  const { id: collectionID } = req.params;
  const { name } = req.body;

  if (!collectionID || !name) {
    res.status(400);
    throw new Error("Invalid request");
  }

  const collection = await Collection.findOneAndUpdate(
    { _id: collectionID, isActive: true },
    {
      name,
    },
    {
      new: true, // if true, return the modified document rather than the original
      runValidators: true, //  if true, runs update validators on this command
    }
  );

  if (collection) {
    res.status(200).json({
      message: "Collection Updated Successfully",
      collection,
    });
  } else {
    res.status(500);
    throw new Error("Collection not found");
  }
});

/**
 * @desc get all collections
 * @route GET /api/collection
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - All collections from db
 * @access Public
 */

const getAllCollection = asyncHandler(async (_req, res) => {
  const collections = await Collection.find({ isActive: true }).sort({
    createdAt: -1,
  });

  if (collections) {
    res.status(200).json(collections);
  } else {
    res.status(500);
    throw new Error("something went wrong");
  }
});

/**
 * @desc delete collection
 * @route DELETE /api/collection
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - message after successful deletion
 * @access Admin or staff
 */
const deleteCollection = asyncHandler(async (req, res) => {
  const { id: collectionID } = req.params;

  if (!collectionID) {
    res.status(400);
    throw new Error("Invalid request");
  }
  const collection = await Collection.findById(collectionID);

  if (collection) {
    collection.isActive = false;
    await collection.save();
    res.status(200).json({
      message: "Collection has been deleted successfully",
    });
  } else {
    res.status(500);
    throw new Error("Collection not found");
  }
});

export {
  createCollection,
  updateCollection,
  getAllCollection,
  deleteCollection,
};
