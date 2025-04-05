import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import matchRoutes from "./api/v1/routes/matchRoutes";
import playerRoutes from "./api/v1/routes/playerRoutes";
import teamRoutes from "./api/v1/routes/teamRoutes";
import { errorResponse } from "./api/v1/models/Match";
import swaggerDocs from "../config/swagger";

const app = express();

app.use(json());

// Mount API routes
app.use("/api/v1/matches", matchRoutes);
app.use("/api/v1/players", playerRoutes);
app.use("/api/v1/teams", teamRoutes);

// Setup Swagger documentation at /api-docs
swaggerDocs(app);

// Error-handling middleware (must include four parameters)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json(errorResponse("Internal server error"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;