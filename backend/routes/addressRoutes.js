import { Router } from "express";
import {
  addNewAddress,
  updateAddress,
  deleteAddress,
  makePrimary,
  getUserAddress,
} from "../controllers/addressController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .post(isLoggedIn, addNewAddress)
  .get(isLoggedIn, getUserAddress);
router
  .route("/:id")
  .put(isLoggedIn, updateAddress)
  .delete(isLoggedIn, deleteAddress)
  .patch(isLoggedIn, makePrimary);

export default router;
