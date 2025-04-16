import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import helmet from "helmet";
import cors from "cors";
import matchRoutes from "./api/v1/routes/matchRoutes";
import playerRoutes from "./api/v1/routes/playerRoutes";
import teamRoutes from "./api/v1/routes/teamRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import editorRoutes from "./api/v1/routes/editorRoutes";

import { errorResponse } from "./api/v1/models/Matchmodels";
import setSwagger from "../config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler";
import { authenticate } from "./api/v1/middleware/authenticate";

// Load environment variables before using them
dotenv.config();

const app = express();

// Middleware setup
app.use(json());

// Setup Swagger for API documentation
setSwagger(app);

// CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:7000"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Mount API routes
app.use("/api/v1/matches", matchRoutes);
app.use("/api/v1/players", playerRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/editor", editorRoutes);

// Global authentication (if needed after specific routes)
app.use(authenticate);

// Centralized error handler
app.use(errorHandler);

// Fallback error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json(errorResponse("Internal server error"));
});

// Helmet (keep after express.json, cors, morgan)
app.use(helmet());

// Start server
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 7000;

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  
}

export default app;
