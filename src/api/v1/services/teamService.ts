import { Team } from "../models/Team";
import * as teamRepository from "../repositories/teamRepository";

export const getAllTeams = async (): Promise<Team[]> => {
  return await teamRepository.getTeams();
};

export const getTeamById = async (id: string): Promise<Team | null> => {
  return await teamRepository.getTeamById(id);
};


export const createTeam = async (teamData: Partial<Team>): Promise<string> => {
  const team: Team = {
    id: "", 
    name: teamData.name || "",
    country: teamData.country || "",
    players: teamData.players || [],
  };

  return await teamRepository.createTeam(team);
};

export const updateTeam = async (id: string, teamData: Partial<Team>): Promise<void> => {
  return await teamRepository.updateTeam(id, teamData);
};

export const deleteTeam = async (id: string): Promise<void> => {
  return await teamRepository.deleteTeam(id);
};
