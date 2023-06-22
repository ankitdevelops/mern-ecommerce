import Collection from "../models/collectionModel.js";
import asyncHandler from "../services/asyncHandler.js";

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

const updateCollection = asyncHandler(async (req, res) => {
  const { id: collectionID } = req.params;
  const { name } = req.body;

  if (!collectionID || !name) {
    res.status(400);
    throw new Error("Invalid request");
  }

  const collection = await Collection.findByIdAndUpdate(
    collectionID,
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
    throw new Error("something went wrong");
  }
});

const getAllCollection = asyncHandler(async (_req, res) => {
  const collections = await Collection.find();

  if (collections) {
    res.status(200).json(collections);
  } else {
    res.status(500);
    throw new Error("something went wrong");
  }
});

const deleteCollection = asyncHandler(async (req, res) => {
  const { id: collectionID } = req.params;

  if (!collectionID) {
    res.status(400);
    throw new Error("Invalid request");
  }
  const collection = await Collection.findByIdAndDelete(collectionID);

  if (collection) {
    res.status(200).json({
      message: "Collection has been deleted successfully",
    });
  } else {
    res.status(500);
    throw new Error("something went wrong");
  }
});

export {
  createCollection,
  updateCollection,
  getAllCollection,
  deleteCollection,
};
