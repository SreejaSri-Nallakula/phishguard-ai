import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { sendOTPEmail } from "../lib/mailer.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

export const authenticateToken = async (req: Request, res: Response, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as any).user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash, name },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ user: { id: user.id, email, name }, token });
  } catch (error) {
    res.status(500).json({ error: "Failed to create account" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ user: { id: user.id, email: user.email, name: user.name }, token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, profileImage } = req.body;
    const userId = (req as any).user.userId;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, profileImage },
    });

    res.json({ 
      user: { 
        id: updatedUser.id, 
        email: updatedUser.email, 
        name: updatedUser.name,
        profileImage: updatedUser.profileImage
      } 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // For security, don't reveal if user exists
      return res.json({ message: "If an account with that email exists, an OTP has been sent." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.user.update({
      where: { email },
      data: { otp, otpExpiry },
    });

    try {
      await sendOTPEmail(email, otp);
    } catch (mailError) {
      console.error("Email service error, skipping real mail delivery.");
    }
    
    // Always log OTP to console in development as a backup
    console.log(`[DEVELOPER NOTICE] OTP for ${email} is: ${otp}`);
    
    res.json({ message: "If an account with that email exists, an OTP has been sent." });
  } catch (error) {
    res.status(500).json({ error: "Failed to process request" });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.otp !== otp || (user.otpExpiry && user.otpExpiry < new Date())) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: "Verification failed" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.otp !== otp || (user.otpExpiry && user.otpExpiry < new Date())) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { 
        passwordHash, 
        otp: null, 
        otpExpiry: null 
      },
    });

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reset password" });
  }
};
