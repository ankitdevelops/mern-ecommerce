import { Router } from "express";
import {
  createCollection,
  getAllCollection,
  updateCollection,
  deleteCollection,
} from "../controllers/collectionController.js";
import { isLoggedIn, authorize } from "../middleware/authMiddleware.js";
import AuthRoles from "../utils/AuthRoles.js";

const router = Router();

router
  .route("/")
  .post(
    isLoggedIn,
    authorize(AuthRoles.ADMIN, AuthRoles.STAFF),
    createCollection
  )
  .get(getAllCollection);
router
  .route("/:id")
  .put(
    isLoggedIn,
    authorize(AuthRoles.ADMIN, AuthRoles.STAFF),
    updateCollection
  )
  .delete(
    isLoggedIn,
    authorize(AuthRoles.ADMIN, AuthRoles.STAFF),
    deleteCollection
  );

export default router;
