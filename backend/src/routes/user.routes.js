import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

console.log("jbb");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyUser, logoutUser);

export default router;
