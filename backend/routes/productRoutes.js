import { Router } from "express";
import {
  createProduct,
  getProductByCollection,
  getProductById,
  getProducts,
  addProductPhotos,
} from "../controllers/productController.js";
import { isLoggedIn, authorize } from "../middleware/authMiddleware.js";
import AuthRoles from "../utils/AuthRoles.js";

const router = Router();

router
  .route("/")
  .post(isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.STAFF), createProduct)
  .get(getProducts);

router
  .route("/:id")
  .post(
    isLoggedIn,
    authorize(AuthRoles.ADMIN, AuthRoles.STAFF),
    addProductPhotos
  );

export default router;
