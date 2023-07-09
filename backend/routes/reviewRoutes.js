import { Router } from "express";
import {
  createReview,
  getProductReview,
  deleteReview,
} from "../controllers/reviewsController.js";
import { authorize, isLoggedIn } from "../middleware/authMiddleware.js";
import AuthRoles from "../utils/AuthRoles.js";

const router = Router();

router
  .route("/:id")
  .post(isLoggedIn, createReview)
  .get(isLoggedIn, getProductReview)
  .put(isLoggedIn, authorize(AuthRoles.STAFF, AuthRoles.ADMIN), deleteReview);

export default router;
