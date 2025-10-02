import express from "express";
import { viewProfile, updateProfile } from "../controllers/usercontroller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply the middleware to protect these routes
router.use(authMiddleware);

router.get("/profile", viewProfile);
router.put("/profile", updateProfile);

export default router;