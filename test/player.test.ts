import * as playerService from "../src/api/v1/services/playerService";
import * as playerRepository from "../src/api/v1/repositories/playerRepository";
import { Player } from "../src/api/v1/models/Playermodels";

jest.mock("../src/api/v1/repositories/playerRepository");

const mockPlayer: Player = {
  id: "1",
  name: "Virat Kohli",
  teamId: "RCB",
  role: "batsman",
  runs: 12000,
  wickets: 4,
  average: 58.3,
};

describe("playerService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllPlayers should return a list of players", async () => {
    (playerRepository.getPlayers as jest.Mock).mockResolvedValue([mockPlayer]);
    const result = await playerService.getAllPlayers();
    expect(result).toEqual([mockPlayer]);
  });

  test("getPlayerById should return a player by ID", async () => {
    (playerRepository.getPlayerById as jest.Mock).mockResolvedValue(mockPlayer);
    const result = await playerService.getPlayerById("1");
    expect(result).toEqual(mockPlayer);
  });

  test("createPlayer should return created player ID", async () => {
    (playerRepository.createPlayer as jest.Mock).mockResolvedValue("1");
    const playerData: Partial<Player> = {
      name: "Virat Kohli",
      teamId: "RCB",
      role: "batsman",
      runs: 12000,
      wickets: 4,
      average: 58.3,
    };
    const result = await playerService.createPlayer(playerData);
    expect(result).toBe("1");
  });

  test("updatePlayer should call repository with updated data", async () => {
    (playerRepository.updatePlayer as jest.Mock).mockResolvedValue(undefined);
    await playerService.updatePlayer("1", { runs: 13000 });
    expect(playerRepository.updatePlayer).toHaveBeenCalledWith("1", { runs: 13000 });
  });

  test("deletePlayer should call repository to delete the player", async () => {
    (playerRepository.deletePlayer as jest.Mock).mockResolvedValue(undefined);
    await playerService.deletePlayer("1");
    expect(playerRepository.deletePlayer).toHaveBeenCalledWith("1");
  });
});
