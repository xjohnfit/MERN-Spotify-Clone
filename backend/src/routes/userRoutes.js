import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controllers/userControllers.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);
//TODO: getMessages

export default router;