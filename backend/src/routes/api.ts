import { Router } from "express";
import { signup, login, updateProfile, authenticateToken, forgotPassword, verifyOTP, resetPassword } from "../controllers/authController.js";
import { analyzeAndSave, getHistory, getStats } from "../controllers/scanController.js";

const router = Router();

// Auth routes
router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.put("/auth/profile", authenticateToken, updateProfile);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/verify-otp", verifyOTP);
router.post("/auth/reset-password", resetPassword);

// Scan routes
router.post("/scans/analyze", analyzeAndSave);
router.get("/scans", getHistory);
router.get("/scans/stats", getStats);

export default router;
