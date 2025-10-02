// In backend/src/routes/entryRoutes.js

import express from "express";
import {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
  searchEntries, // 👈 Make sure this is imported
} from "../controllers/entrycontroller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createEntry);
router.get("/", getEntries);

// 👇 THIS ROUTE IS CRUCIAL 👇
// It must come BEFORE the '/:id' route
router.get("/search", searchEntries);

router.get("/:id", getEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;