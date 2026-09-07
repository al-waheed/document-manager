import "dotenv/config";
import express from "express";
import cors from "cors";
import documentRoutes from "./routes/document.routes.js";
import { logger } from "./middleware/logger.middleware.js";
import { connectDB } from "./config/database.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./auth/auth.routes.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(logger);
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
