import { Request, Response } from "express";
import {
  getAllMatches,
  getRandomMatch,
  getMatch,
  createMatchHandler,
  updateMatchHandler,
  deleteMatchHandler,
} from "../src/api/v1/controllers/matchController";
import * as matchRepository from "../src/api/v1/repositories/matchRepository";
import { Match, successResponse, errorResponse } from "../src/api/v1/models/Match";


describe("Match Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("getAllMatches", () => {
    it("should return matches based on category", async () => {
      // Arrange
      const fakeMatches: Match[] = [
        {
          id: "1",
          team1: "India",
          team2: "Australia",
          date: new Date(),
          venue: "Mumbai",
          status: "upcoming",
          score: { India: 0, Australia: 0 },
        },
      ];
      jest.spyOn(matchRepository, "getMatches").mockResolvedValue(fakeMatches);
      req.query = { category: "upcoming" };

      // Act
      await getAllMatches(req as Request, res as Response);

      // Assert
      expect(matchRepository.getMatches).toHaveBeenCalledWith("upcoming");
      expect(res.json).toHaveBeenCalledWith(successResponse(fakeMatches));
    });

    it("should handle errors", async () => {
      // Arrange
      jest.spyOn(matchRepository, "getMatches").mockRejectedValue(new Error("Error"));

      // Act
      await getAllMatches(req as Request, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(errorResponse("Internal server error"));
    });
  });

  describe("getRandomMatch", () => {
    it("should return a random match", async () => {
      // Arrange
      const fakeMatches: Match[] = [
        {
          id: "1",
          team1: "India",
          team2: "Australia",
          date: new Date(),
          venue: "Mumbai",
          status: "upcoming",
          score: { India: 0, Australia: 0 },
        },
        {
          id: "2",
          team1: "Australia",
          team2: "India",
          date: new Date(),
          venue: "Sydney",
          status: "upcoming",
          score: { India: 0, Australia: 0 },
        },
      ];
      jest.spyOn(matchRepository, "getMatches").mockResolvedValue(fakeMatches);

      // Act
      await getRandomMatch(req as Request, res as Response);

      // Assert
      const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
      expect(fakeMatches).toContainEqual(jsonResponse.data);
    });

    it("should handle errors", async () => {
      // Arrange
      jest.spyOn(matchRepository, "getMatches").mockRejectedValue(new Error("Error"));

      // Act
      await getRandomMatch(req as Request, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(errorResponse("Internal server error"));
    });
  });

  describe("getMatch", () => {
    it("should return a match by ID", async () => {
      // Arrange
      const fakeMatch: Match = {
        id: "1",
        team1: "India",
        team2: "Australia",
        date: new Date(),
        venue: "Mumbai",
        status: "upcoming",
        score: { India: 0, Australia: 0 },
      };
      jest.spyOn(matchRepository, "getMatchById").mockResolvedValue(fakeMatch);
      req.params = { id: "1" };

      // Act
      await getMatch(req as Request, res as Response);

      // Assert
      expect(matchRepository.getMatchById).toHaveBeenCalledWith("1");
      expect(res.json).toHaveBeenCalledWith(successResponse(fakeMatch));
    });

    it("should handle errors", async () => {
      // Arrange
      jest.spyOn(matchRepository, "getMatchById").mockRejectedValue(new Error("Error"));
      req.params = { id: "1" };

      // Act
      await getMatch(req as Request, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(errorResponse("Internal server error"));
    });
  });

  describe("createMatchHandler", () => {
    it("should create a match and return a created response", async () => {
      // Arrange
      const fakeMatchId = "123";
      jest.spyOn(matchRepository, "createMatch").mockResolvedValue(fakeMatchId);
      const matchData = {
        team1: "England",
        team2: "Australia",
        date: new Date().toISOString(), // Passed as string from the request
        status: "upcoming",
        score: { England: 0, Australia: 0 },
      };
      req.body = matchData;

      // Act
      await createMatchHandler(req as Request, res as Response);

      // Assert
      expect(matchRepository.createMatch).toHaveBeenCalledWith(
        expect.objectContaining({
          team1: "England",
          team2: "Australia",
          status: "upcoming",
          score: { England: 0, Australia: 0 },
          date: expect.any(Date), // The controller converts the string to a Date
        })
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(successResponse({ id: fakeMatchId }, "Match created"));
    });

    it("should handle errors", async () => {
      // Arrange
      jest.spyOn(matchRepository, "createMatch").mockRejectedValue(new Error("Error"));
      req.body = {};

      // Act
      await createMatchHandler(req as Request, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(errorResponse("Internal server error"));
    });
  });

  describe("updateMatchHandler", () => {
    it("should update a match and return success", async () => {
      // Arrange
      jest.spyOn(matchRepository, "updateMatch").mockResolvedValue();
      req.params = { id: "1" };
      req.body = { team1: "India" };

      // Act
      await updateMatchHandler(req as Request, res as Response);

      // Assert
      expect(matchRepository.updateMatch).toHaveBeenCalledWith("1", { team1: "India" });
      expect(res.json).toHaveBeenCalledWith(successResponse({}, "Match updated"));
    });

    it("should handle errors", async () => {
      // Arrange
      jest.spyOn(matchRepository, "updateMatch").mockRejectedValue(new Error("Error"));
      req.params = { id: "1" };
      req.body = { team1: "India" };

      // Act
      await updateMatchHandler(req as Request, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(errorResponse("Internal server error"));
    });
  });

  describe("deleteMatchHandler", () => {
    it("should delete a match and return success", async () => {
      // Arrange
      jest.spyOn(matchRepository, "deleteMatch").mockResolvedValue();
      req.params = { id: "1" };

      // Act
      await deleteMatchHandler(req as Request, res as Response);

      // Assert
      expect(matchRepository.deleteMatch).toHaveBeenCalledWith("1");
      expect(res.json).toHaveBeenCalledWith(successResponse({}, "Match deleted"));
    });

    it("should handle errors", async () => {
      // Arrange
      jest.spyOn(matchRepository, "deleteMatch").mockRejectedValue(new Error("Error"));
      req.params = { id: "1" };

      // Act
      await deleteMatchHandler(req as Request, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(errorResponse("Internal server error"));
    });
  });
});
