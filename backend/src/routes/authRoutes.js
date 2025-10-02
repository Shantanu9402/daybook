import express from "express";
import {
  signup,
  login,
  logout,
  changePassword,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/change-password", authMiddleware, changePassword);

export default router;