import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { getAllUsers, getMessages } from "../controllers/userControllers.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);
router.get('/messages/:userId', protectRoute, getMessages);
export default router;