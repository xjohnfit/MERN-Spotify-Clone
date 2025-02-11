import { Router } from "express";
import { getAllSongs, getFeaturedSongs, madeForYou, trending } from "../controllers/songsControllers.js";
import { protectRoute, requireAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", madeForYou);
router.get("/trending", trending);

export default router;