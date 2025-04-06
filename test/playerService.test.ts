import request from "supertest";
import app from "../src/app";

jest.mock("../src/api/v1/repositories/playerRepository");

import { getPlayers, getPlayerById } from "../src/api/v1/repositories/playerRepository";

const mockPlayer = {
  id: "1",
  name: "Virat Kohli",
  teamId: "IND",
  runs: 12000,
  wickets: 5,
  average: 58.7
};

describe("Player Controller API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all players", async () => {
    // Arrange: 
    (getPlayers as jest.Mock).mockResolvedValue([mockPlayer]);

    // Act: 
    const res = await request(app).get("/api/v1/players");

    // Assert: 
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
  });

  
  it("should fetch a player by ID", async () => {
    // Arrange: 
    (getPlayerById as jest.Mock).mockResolvedValue(mockPlayer);

    // Act: 
    const res = await request(app).get("/api/v1/players/1");

    // Assert:
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Virat Kohli");
  });
});
