import { Router } from "express";
import { signup, login, updateProfile, authenticateToken, forgotPassword, verifyOTP, resetPassword } from "../controllers/authController.js";
import { analyzeAndSave, getHistory, getStats } from "../controllers/scanController.js";
import { prisma } from "../lib/prisma.js";

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

// Debug route for production diagnosis
router.get("/debug", async (req, res) => {
  try {
    // Attempt a simple query
    const userCount = await prisma.user.count();
    res.json({ 
      status: "success", 
      message: "Database connection successful", 
      userCount,
      env: {
        nodeEnv: process.env.NODE_ENV,
        hasUrl: !!process.env.DATABASE_URL
      }
    });
  } catch (error: any) {
    res.status(500).json({ 
      status: "error", 
      message: "Database connection failed", 
      error: error.message,
      env: {
        nodeEnv: process.env.NODE_ENV,
        hasUrl: !!process.env.DATABASE_URL
      }
    });
  }
});

export default router;
