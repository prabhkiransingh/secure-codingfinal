import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cricket API",
      version: "1.0.0",
      description: "API for managing cricket players, teams, and matches",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/api/v1/routes/*.ts"], // Make sure path is correct
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app: express.Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerDocs;
