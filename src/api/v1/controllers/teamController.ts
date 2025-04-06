import { Request, Response } from "express";
import { 
  getTeams, 
  getTeamById, 
  createTeam, 
  updateTeam, 
  deleteTeam 
} from "../repositories/teamRepository";
import { successResponse, errorResponse } from "../models/Match";


export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await getTeams();
    res.json(successResponse(teams));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getTeam = async (req: Request, res: Response) => {
  try {
    const team = await getTeamById(req.params.id);
    res.json(successResponse(team));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const createTeamHandler = async (req: Request, res: Response) => {
  try {
    const teamId = await createTeam({
      ...req.body,
      players: req.body.players || []
    });
    res.status(201).json(successResponse({ id: teamId }, "Team created"));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const updateTeamHandler = async (req: Request, res: Response) => {
  try {
    await updateTeam(req.params.id, req.body);
    res.json(successResponse({}, "Team updated"));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const deleteTeamHandler = async (req: Request, res: Response) => {
  try {
    await deleteTeam(req.params.id);
    res.json(successResponse({}, "Team deleted"));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};