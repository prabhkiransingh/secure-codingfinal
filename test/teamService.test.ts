import * as teamService from "../src/api/v1/services/teamService";
import * as teamRepository from "../src/api/v1/repositories/teamRepository";
import { Team } from "../src/api/v1/models/Teammodels";

jest.mock("../src/api/v1/repositories/teamRepository");

const mockTeam: Team = {
  id: "1",
  name: "Warriors",
  country: "USA",
  players: ["Player1", "Player2"],
};

describe("teamService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllTeams should return all teams", async () => {
    (teamRepository.getTeams as jest.Mock).mockResolvedValue([mockTeam]);

    const result = await teamService.getAllTeams();
    expect(result).toEqual([mockTeam]);
    expect(teamRepository.getTeams).toHaveBeenCalledTimes(1);
  });

  test("getTeamById should return team by ID", async () => {
    (teamRepository.getTeamById as jest.Mock).mockResolvedValue(mockTeam);

    const result = await teamService.getTeamById("1");
    expect(result).toEqual(mockTeam);
    expect(teamRepository.getTeamById).toHaveBeenCalledWith("1");
  });

  test("createTeam should create a new team", async () => {
    (teamRepository.createTeam as jest.Mock).mockResolvedValue("1");

    const teamData = { name: "Warriors", country: "USA", players: ["Player1"] };
    const result = await teamService.createTeam(teamData);

    expect(result).toBe("1");
    expect(teamRepository.createTeam).toHaveBeenCalledWith({
      id: "",
      name: "Warriors",
      country: "USA",
      players: ["Player1"],
    });
  });

  test("updateTeam should call repository with correct data", async () => {
    (teamRepository.updateTeam as jest.Mock).mockResolvedValue(undefined);

    await teamService.updateTeam("1", { name: "Updated Team" });

    expect(teamRepository.updateTeam).toHaveBeenCalledWith("1", { name: "Updated Team" });
  });

  test("deleteTeam should call repository with correct ID", async () => {
    (teamRepository.deleteTeam as jest.Mock).mockResolvedValue(undefined);

    await teamService.deleteTeam("1");

    expect(teamRepository.deleteTeam).toHaveBeenCalledWith("1");
  });


  test("getTeamById should return null if team not found", async () => {
    (teamRepository.getTeamById as jest.Mock).mockResolvedValue(null);

    const result = await teamService.getTeamById("99");
    expect(result).toBeNull();
  });

  test("createTeam should fill missing optional fields with defaults", async () => {
    (teamRepository.createTeam as jest.Mock).mockResolvedValue("2");

    const result = await teamService.createTeam({ name: "No Country Team" });

    expect(result).toBe("2");
    expect(teamRepository.createTeam).toHaveBeenCalledWith({
      id: "",
      name: "No Country Team",
      country: "",
      players: [],
    });
  });

  test("getAllTeams should return an empty array if no teams exist", async () => {
    (teamRepository.getTeams as jest.Mock).mockResolvedValue([]);

    const result = await teamService.getAllTeams();
    expect(result).toEqual([]);
  });

  test("updateTeam should work with partial data", async () => {
    (teamRepository.updateTeam as jest.Mock).mockResolvedValue(undefined);

    await teamService.updateTeam("1", { country: "Canada" });

    expect(teamRepository.updateTeam).toHaveBeenCalledWith("1", { country: "Canada" });
  });

  test("createTeam with empty object should fill all fields with defaults", async () => {
    (teamRepository.createTeam as jest.Mock).mockResolvedValue("3");

    const result = await teamService.createTeam({});
    expect(result).toBe("3");

    expect(teamRepository.createTeam).toHaveBeenCalledWith({
      id: "",
      name: "",
      country: "",
      players: [],
    });
  });

  test("deleteTeam should not throw if ID does not exist", async () => {
    (teamRepository.deleteTeam as jest.Mock).mockResolvedValue(undefined);

    await expect(teamService.deleteTeam("999")).resolves.not.toThrow();
  });

  test("createTeam should handle multiple players correctly", async () => {
    (teamRepository.createTeam as jest.Mock).mockResolvedValue("4");

    const players = ["Alice", "Bob", "Charlie"];
    const teamData = { name: "Champions", country: "India", players };

    const result = await teamService.createTeam(teamData);
    expect(result).toBe("4");

    expect(teamRepository.createTeam).toHaveBeenCalledWith({
      id: "",
      name: "Champions",
      country: "India",
      players,
    });
  });

  test("updateTeam with empty data should still call repository", async () => {
    (teamRepository.updateTeam as jest.Mock).mockResolvedValue(undefined);

    await teamService.updateTeam("1", {});
    expect(teamRepository.updateTeam).toHaveBeenCalledWith("1", {});
  });
});

