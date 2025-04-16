
import { Request, Response } from "express";
import * as teamController from "../src/api/v1/controllers/teamController";
import * as teamRepo from "../src/api/v1/repositories/teamRepository";
import { successResponse, errorResponse } from "../src/api/v1/models/Matchmodels";
jest.mock("../src/api/v1/repositories/teamRepository");



describe("Team Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = {
      params: {},
      body: {},
      query: {},
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getAllTeams", () => {
    it("should return all teams", async () => {
      const teams = [{ name: "Team A" }, { name: "Team B" }];
      (teamRepo.getTeams as jest.Mock).mockResolvedValue(teams);

      await teamController.getAllTeams(
        mockReq as Request,
        mockRes as Response
      );

      expect(teamRepo.getTeams).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(successResponse(teams));
    });

    it("should handle errors", async () => {
      const error = new Error("DB Error");
      (teamRepo.getTeams as jest.Mock).mockRejectedValue(error);

      await teamController.getAllTeams(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(
        errorResponse("Internal server error")
      );
    });
  });

  describe("getTeam", () => {
    it("should return a single team by ID", async () => {
      const team = { id: "123", name: "Team X" };
      mockReq.params = { id: "123" };
      (teamRepo.getTeamById as jest.Mock).mockResolvedValue(team);

      await teamController.getTeam(mockReq as Request, mockRes as Response);

      expect(teamRepo.getTeamById).toHaveBeenCalledWith("123");
      expect(mockRes.json).toHaveBeenCalledWith(successResponse(team));
    });

    it("should handle errors", async () => {
      mockReq.params = { id: "123" };
      (teamRepo.getTeamById as jest.Mock).mockRejectedValue(new Error("error"));

      await teamController.getTeam(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(
        errorResponse("Internal server error")
      );
    });
  });

  describe("createTeamHandler", () => {
    it("should create a team", async () => {
      mockReq.body = { name: "New Team", players: ["p1", "p2"] };
      (teamRepo.createTeam as jest.Mock).mockResolvedValue("abc123");

      await teamController.createTeamHandler(
        mockReq as Request,
        mockRes as Response
      );

      expect(teamRepo.createTeam).toHaveBeenCalledWith({
        name: "New Team",
        players: ["p1", "p2"],
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        successResponse({ id: "abc123" }, "Team created")
      );
    });

    it("should handle errors", async () => {
      mockReq.body = { name: "New Team" };
      (teamRepo.createTeam as jest.Mock).mockRejectedValue(new Error("error"));

      await teamController.createTeamHandler(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(
        errorResponse("Internal server error")
      );
    });
  });

  describe("updateTeamHandler", () => {
    it("should update a team", async () => {
      mockReq.params = { id: "team123" };
      mockReq.body = { name: "Updated Team" };
      (teamRepo.updateTeam as jest.Mock).mockResolvedValue(undefined);

      await teamController.updateTeamHandler(
        mockReq as Request,
        mockRes as Response
      );

      expect(teamRepo.updateTeam).toHaveBeenCalledWith("team123", {
        name: "Updated Team",
      });
      expect(mockRes.json).toHaveBeenCalledWith(
        successResponse({}, "Team updated")
      );
    });

    it("should handle errors", async () => {
      mockReq.params = { id: "team123" };
      mockReq.body = { name: "Updated Team" };
      (teamRepo.updateTeam as jest.Mock).mockRejectedValue(new Error("fail"));

      await teamController.updateTeamHandler(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(
        errorResponse("Internal server error")
      );
    });
  });

  describe("deleteTeamHandler", () => {
    it("should delete a team", async () => {
      mockReq.params = { id: "team456" };
      (teamRepo.deleteTeam as jest.Mock).mockResolvedValue(undefined);

      await teamController.deleteTeamHandler(
        mockReq as Request,
        mockRes as Response
      );

      expect(teamRepo.deleteTeam).toHaveBeenCalledWith("team456");
      expect(mockRes.json).toHaveBeenCalledWith(
        successResponse({}, "Team deleted")
      );
    });

    it("should handle errors", async () => {
      mockReq.params = { id: "team456" };
      (teamRepo.deleteTeam as jest.Mock).mockRejectedValue(new Error("err"));

      await teamController.deleteTeamHandler(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(
        errorResponse("Internal server error")
      );
    });
  });
});
