import { Router } from "express";
import {
  createProduct,
  getProductByCollection,
  getProductById,
  getProducts,
  addProductPhotos,
  updateProductInfo,
  deleteProduct,
  deleteUploadedProductPhotos,
} from "../controllers/productController.js";
import { isLoggedIn, authorize } from "../middleware/authMiddleware.js";
import AuthRoles from "../utils/AuthRoles.js";

const router = Router();

router
  .route("/")
  .get(getProducts)
  .post(isLoggedIn, authorize(AuthRoles.ADMIN, AuthRoles.STAFF), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .post(
    isLoggedIn,
    authorize(AuthRoles.ADMIN, AuthRoles.STAFF),
    addProductPhotos
  )
  .put(
    isLoggedIn,
    authorize(AuthRoles.ADMIN, AuthRoles.STAFF),
    updateProductInfo
  )
  .delete(
    isLoggedIn,
    authorize(AuthRoles.ADMIN, AuthRoles.STAFF),
    deleteProduct
  );

router.route("/collection/:id").get(getProductByCollection);
router
  .route("/image/delete/")
  .post(
    isLoggedIn,
    authorize(AuthRoles.STAFF, AuthRoles.ADMIN),
    deleteUploadedProductPhotos
  );

export default router;
