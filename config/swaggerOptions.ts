const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cricket API Documentation",
      version: "1.0.0",
      description: "API to retrieve cricket match details, player stats, and team information.",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/models/*.ts"],
};

export const generateSwaggerSpec = () => {
  return swaggerJsdoc(swaggerOptions);
};
