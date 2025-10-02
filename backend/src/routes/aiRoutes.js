// In backend/src/routes/aiRoutes.js

import express from "express";
import { chatWithAssistant } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// When the frontend sends a POST request to /api/ai/chat-journal, it will run our controller function
router.post("/chat-journal", authMiddleware, chatWithAssistant);

export default router;