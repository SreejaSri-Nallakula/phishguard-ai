import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api", apiRoutes);

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
