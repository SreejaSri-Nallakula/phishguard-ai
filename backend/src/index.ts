import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Diagnostic logging for Production
if (process.env.NODE_ENV === "production") {
  console.log("--- Production Environment Check ---");
  console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);
  console.log("JWT_SECRET present:", !!process.env.JWT_SECRET);
  if (!process.env.DATABASE_URL) console.error("CRITICAL: DATABASE_URL is missing!");
  console.log("------------------------------------");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: process.env.FRONTEND_URL || true,
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api", apiRoutes);
app.use("/", apiRoutes); // Fallback for platforms that strip the /api prefix

// Serve static files from the React app
const frontendPath = path.resolve(__dirname, "../../frontend/dist");
console.log(`Serving static files from: ${frontendPath}`);

app.use(express.static(frontendPath));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  
  const indexPath = path.join(frontendPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error(`Error sending index.html from ${indexPath}:`, err);
      res.status(200).send("PhishGuard AI Backend is running! (Frontend build not found at " + indexPath + ")");
    }
  });
});

// Only listen in manual start, Vercel will handle the app
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
