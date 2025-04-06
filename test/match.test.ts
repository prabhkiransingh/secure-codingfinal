import request from "supertest";
import app from "../src/app";

describe("Cricket API - Match Routes", () => {
  it("should retrieve all matches", async () => {
    // Act:
    const response = await request(app).get("/api/v1/matches");

    // Assert: 
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
