import { Player } from "../models/Player";
import * as playerRepository from "../repositories/playerRepository";

export const getAllPlayers = async (teamId?: string): Promise<Player[]> => {
  return await playerRepository.getPlayers(teamId);
};

export const getPlayerById = async (id: string): Promise<Player | null> => {
    return await playerRepository.getPlayerById(id);
  };
  

export const createPlayer = async (playerData: Partial<Player>): Promise<string> => {
  const player: Player = {
    ...playerData,
    runs: Number(playerData.runs),
    wickets: Number(playerData.wickets),
    average: Number(playerData.average),
  } as Player;

  return await playerRepository.createPlayer(player);
};

export const updatePlayer = async (id: string, playerData: Partial<Player>): Promise<void> => {
  return await playerRepository.updatePlayer(id, playerData);
};

export const deletePlayer = async (id: string): Promise<void> => {
  return await playerRepository.deletePlayer(id);
};
