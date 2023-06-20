import { Router } from "express";
import {
  registerUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/user.js";

const router = Router();

router.route("/").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);

export default router;
