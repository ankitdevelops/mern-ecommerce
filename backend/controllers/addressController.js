import UserAddress from "../models/addressModel.js";
import asyncHandler from "../services/asyncHandler.js";

/**
 * @desc Add a new Address
 * @route POST /api/user/address
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - newly added address
 * @access Authenticated User
 */

const addNewAddress = asyncHandler(async (req, res) => {
  const { streetAddress, city, state, postalCode, phoneNumbers } = req.body;

  if (!streetAddress || !city || !state || !postalCode || !phoneNumbers) {
    res.status(400);
    throw new Error("Invalid Request");
  }

  const newAddress = await UserAddress.create({
    user: req.user,
    streetAddress,
    city,
    state,
    postalCode,
    phoneNumbers,
  });

  if (newAddress) {
    res.status(201).json({
      _id: newAddress._id,
      streetAddress: newAddress.streetAddress,
      city: newAddress.city,
      state: newAddress.state,
      postalCode: newAddress.postalCode,
      phoneNumbers: newAddress.phoneNumbers,
      isActive: newAddress.isActive,
      isPrimary: newAddress.isPrimary,
    });
  }
});

/**
 * @desc Get all address of User
 * @route POST /api/user/address
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - newly added address
 * @access Authenticated User
 */

const getUserAddress = asyncHandler(async (req, res) => {
  const addresses = await UserAddress.find({
    isActive: true,
    user: req.user,
  });

  if (addresses) {
    res.status(200).json(addresses);
  } else {
    res.status(404).json({
      error: "no address found",
    });
  }
});

/**
 * @desc Update a address
 * @route POST /api/user/address
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - updated address
 * @access Authenticated user
 */
const updateAddress = asyncHandler(async (req, res) => {
  const { id: addressId } = req.params;
  const { streetAddress, city, state, postalCode, phoneNumbers } = req.body;

  if (!streetAddress || !city || !state || !postalCode || !phoneNumbers) {
    res.status(400);
    throw new Error("Invalid Request");
  }

  const address = await UserAddress.findById({ _id: addressId });

  if (!address) {
    res.status(404);
    throw new Error("address not found");
  }

  if (address.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized Access");
  }

  const updatedAddress = await UserAddress.findByIdAndUpdate(
    addressId,
    {
      streetAddress,
      city,
      state,
      postalCode,
      phoneNumbers,
    },
    { new: true }
  );

  if (updateAddress) {
    res.status(200).json({
      _id: updatedAddress._id,
      streetAddress: updatedAddress.streetAddress,
      city: updatedAddress.city,
      state: updatedAddress.state,
      postalCode: updatedAddress.postalCode,
      phoneNumbers: updatedAddress.phoneNumbers,
      isActive: updatedAddress.isActive,
      isPrimary: updatedAddress.isPrimary,
    });
  } else {
    res.status(500).json({
      error: "something went wrong",
    });
  }
});

/**
 * @desc Delete a address
 * @route POST /api/user/address
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - updated address
 * @access Authenticated user
 */
const deleteAddress = asyncHandler(async (req, res) => {
  const { id: addressId } = req.params;

  const address = await UserAddress.findById({ _id: addressId });

  if (!address) {
    res.status(404);
    throw new Error("address not found");
  }

  if (address.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized Access");
  }

  const updatedAddress = await UserAddress.findByIdAndUpdate(
    addressId,
    {
      isActive: false,
    },
    { new: true }
  );

  if (updateAddress) {
    res.status(200).json({
      message: "address deleted successfully",
    });
  } else {
    res.status(500).json({
      error: "something went wrong",
    });
  }
});

/**
 * @desc mark the address as primary
 * @route POST /api/user/address
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - updated address
 * @access Authenticated user
 */
const makePrimary = asyncHandler(async (req, res) => {
  const { id: addressId } = req.params;

  const address = await UserAddress.findById({ _id: addressId });

  if (!address) {
    res.status(404);
    throw new Error("address not found");
  }

  if (address.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Unauthorized Access");
  }

  const updatedAddress = await UserAddress.findByIdAndUpdate(
    addressId,
    {
      isPrimary: true,
    },
    { new: true }
  );

  if (updateAddress) {
    res.status(200).json({
      _id: updatedAddress._id,
      streetAddress: updatedAddress.streetAddress,
      city: updatedAddress.city,
      state: updatedAddress.state,
      postalCode: updatedAddress.postalCode,
      phoneNumbers: updatedAddress.phoneNumbers,
      isActive: updatedAddress.isActive,
      isPrimary: updatedAddress.isPrimary,
    });
  } else {
    res.status(500).json({
      error: "something went wrong",
    });
  }
});

export {
  addNewAddress,
  updateAddress,
  deleteAddress,
  makePrimary,
  getUserAddress,
};
