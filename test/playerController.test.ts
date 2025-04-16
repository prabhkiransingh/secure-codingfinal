import { Request, Response } from "express";
import * as playerController from "../src/api/v1/controllers/playerController";
import * as playerRepo from "../src/api/v1/repositories/playerRepository";
import { successResponse, errorResponse } from "../src/api/v1/models/Matchmodels";

jest.mock("../src/api/v1/repositories/playerRepository");


describe("Player Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = {
      params: {},
      body: {},
      query: {}
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe("getAllPlayers", () => {
    it("should return all players", async () => {
      const players = [{ name: "Player 1" }, { name: "Player 2" }];
      mockReq.query = { teamId: "team123" };
      (playerRepo.getPlayers as jest.Mock).mockResolvedValue(players);

      await playerController.getAllPlayers(mockReq as Request, mockRes as Response);

      expect(playerRepo.getPlayers).toHaveBeenCalledWith("team123");
      expect(mockRes.json).toHaveBeenCalledWith(successResponse(players));
    });

    it("should handle errors", async () => {
      (playerRepo.getPlayers as jest.Mock).mockRejectedValue(new Error("error"));

      await playerController.getAllPlayers(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(errorResponse("Internal server error"));
    });
  });

  describe("getPlayer", () => {
    it("should return a player by ID", async () => {
      const player = { id: "p1", name: "Player One" };
      mockReq.params = { id: "p1" };
      (playerRepo.getPlayerById as jest.Mock).mockResolvedValue(player);

      await playerController.getPlayer(mockReq as Request, mockRes as Response);

      expect(playerRepo.getPlayerById).toHaveBeenCalledWith("p1");
      expect(mockRes.json).toHaveBeenCalledWith(successResponse(player));
    });

    it("should handle errors", async () => {
      mockReq.params = { id: "p1" };
      (playerRepo.getPlayerById as jest.Mock).mockRejectedValue(new Error("error"));

      await playerController.getPlayer(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(errorResponse("Internal server error"));
    });
  });

  describe("createPlayerHandler", () => {
    it("should create a new player", async () => {
      mockReq.body = {
        name: "Player A",
        teamId: "team123",
        role: "batsman",
        runs: "100",
        wickets: "5",
        average: "50"
      };

      (playerRepo.createPlayer as jest.Mock).mockResolvedValue("player123");

      await playerController.createPlayerHandler(mockReq as Request, mockRes as Response);

      expect(playerRepo.createPlayer).toHaveBeenCalledWith({
        name: "Player A",
        teamId: "team123",
        role: "batsman",
        runs: 100,
        wickets: 5,
        average: 50
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        successResponse({ id: "player123" }, "Player created")
      );
    });

    it("should handle errors", async () => {
      mockReq.body = {
        name: "Player A",
        teamId: "team123",
        role: "batsman",
        runs: "100",
        wickets: "5",
        average: "50"
      };
      (playerRepo.createPlayer as jest.Mock).mockRejectedValue(new Error("error"));

      await playerController.createPlayerHandler(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(errorResponse("Internal server error"));
    });
  });

  describe("updatePlayerHandler", () => {
    it("should update a player", async () => {
      mockReq.params = { id: "p100" };
      mockReq.body = { name: "Updated Player" };
      (playerRepo.updatePlayer as jest.Mock).mockResolvedValue(undefined);

      await playerController.updatePlayerHandler(mockReq as Request, mockRes as Response);

      expect(playerRepo.updatePlayer).toHaveBeenCalledWith("p100", { name: "Updated Player" });
      expect(mockRes.json).toHaveBeenCalledWith(successResponse({}, "Player updated"));
    });

    it("should handle errors", async () => {
      mockReq.params = { id: "p100" };
      mockReq.body = { name: "Updated Player" };
      (playerRepo.updatePlayer as jest.Mock).mockRejectedValue(new Error("error"));

      await playerController.updatePlayerHandler(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(errorResponse("Internal server error"));
    });
  });

  describe("deletePlayerHandler", () => {
    it("should delete a player", async () => {
      mockReq.params = { id: "p200" };
      (playerRepo.deletePlayer as jest.Mock).mockResolvedValue(undefined);

      await playerController.deletePlayerHandler(mockReq as Request, mockRes as Response);

      expect(playerRepo.deletePlayer).toHaveBeenCalledWith("p200");
      expect(mockRes.json).toHaveBeenCalledWith(successResponse({}, "Player deleted"));
    });

    it("should handle errors", async () => {
      mockReq.params = { id: "p200" };
      (playerRepo.deletePlayer as jest.Mock).mockRejectedValue(new Error("error"));

      await playerController.deletePlayerHandler(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(errorResponse("Internal server error"));
    });
  });
});