import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getMessages, getusersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users",protectedRoute , getusersForSidebar);
router.get("/:id",protectedRoute , getMessages);
router.post("/send/:id", protectedRoute, sendMessage)

export default router;