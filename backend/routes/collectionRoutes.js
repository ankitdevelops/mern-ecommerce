import { Router } from "express";
import {
  createCollection,
  getAllCollection,
  updateCollection,
  deleteCollection,
} from "../controllers/collectionController.js";

const router = Router();

router.route("/").post(createCollection).get(getAllCollection);
router.route("/:id").put(updateCollection).delete(deleteCollection);

export default router;
