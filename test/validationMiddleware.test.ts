import request from "supertest";
import express, { Request, Response } from "express";
import Joi from "joi";

import { validateRequest } from "../src/api/v1/middleware/validationMiddleware"; // Adjust path if needed

// Define a sample schema for testing
const sampleSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).required()
});

// Create an express app instance for testing
const app = express();
app.use(express.json());

// Define a route using the validation middleware
app.post("/test", validateRequest(sampleSchema), (req: Request, res: Response) => {
  res.status(200).json({ message: "Validation passed" });
});

describe("validateRequest middleware", () => {
  it("should allow valid request", async () => {
    const res = await request(app)
      .post("/test")
      .send({ name: "John", age: 30 });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Validation passed");
  });

  it("should reject request with missing required fields", async () => {
    const res = await request(app)
      .post("/test")
      .send({ name: "John" }); // missing age

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Validation error/);
    expect(res.body.error).toMatch(/"age" is required/);
  });

  it("should reject request with invalid types", async () => {
    const res = await request(app)
      .post("/test")
      .send({ name: "John", age: "not-a-number" }); // invalid age

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/"age" must be a number/);
  });

  it("should allow extra fields if allowUnknown is true", async () => {
    const res = await request(app)
      .post("/test")
      .send({ name: "John", age: 25, extraField: "extra" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Validation passed");
  });
});
