import { Router } from "express";
import { signup, login } from "../controllers/authController.js";
import { analyzeAndSave, getHistory, getStats } from "../controllers/scanController.js";

const router = Router();

// Auth routes
router.post("/auth/signup", signup);
router.post("/auth/login", login);

// Scan routes
router.post("/scans/analyze", analyzeAndSave);
router.get("/scans", getHistory);
router.get("/scans/stats", getStats);

export default router;
