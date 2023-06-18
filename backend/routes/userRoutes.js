import { Router } from "express";
import { registerUser, login, logout } from "../controllers/user.js";

const router = Router();

router.route("/").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
