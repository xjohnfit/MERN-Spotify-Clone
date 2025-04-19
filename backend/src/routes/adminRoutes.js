import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewares/authMiddleware.js";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controllers/adminController.js";

const router = Router();

//Middlewares for all routes => will be called before the route handlers
router.use(protectRoute, requireAdmin);

router.get('/check', checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums/", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;