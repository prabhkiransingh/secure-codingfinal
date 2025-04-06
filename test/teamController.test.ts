import request from "supertest";
import app from "../src/app";

jest.mock("../src/api/v1/repositories/teamRepository");

import {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam
} from "../src/api/v1/repositories/teamRepository";

const mockTeam = {
  id: "1",
  name: "India",
  coach: "Rahul Dravid",
  players: []
};

describe("Team Controller API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all teams", async () => {
    (getTeams as jest.Mock).mockResolvedValue([mockTeam]);

    const res = await request(app).get("/api/v1/teams");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
  });

  it("should fetch a team by ID", async () => {
    (getTeamById as jest.Mock).mockResolvedValue(mockTeam);

    const res = await request(app).get("/api/v1/teams/1");
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("India");
  });

  it("should create a team", async () => {
    (createTeam as jest.Mock).mockResolvedValue("2");

    const res = await request(app).post("/api/v1/teams").send({
      name: "Australia",
      coach: "Andrew McDonald",
      players: []
    });

  });

  it("should update a team", async () => {
    (updateTeam as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).put("/api/v1/teams/1").send({
      name: "India Updated"
    });

    
  });

  it("should delete a team", async () => {
    (deleteTeam as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).delete("/api/v1/teams/1");
    
  });
});
