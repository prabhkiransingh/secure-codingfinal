import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import matchRoutes from "./api/v1/routes/matchRoutes";
import playerRoutes from "./api/v1/routes/playerRoutes";
import teamRoutes from "./api/v1/routes/teamRoutes";
import { errorResponse } from "./api/v1/models/Match";
import setSwagger from "../config/swagger";

const app = express();

app.use(json());

// Setup Swagger for API documentation
setSwagger(app);

// Mount API routes
app.use("/api/v1/matches", matchRoutes);
app.use("/api/v1/players", playerRoutes);
app.use("/api/v1/teams", teamRoutes);

// Error-handling middleware (must include four parameters)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json(errorResponse("Internal server error"));
});

// Start the server if not in test environment
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
