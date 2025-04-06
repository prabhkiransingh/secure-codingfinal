import { Request, Response } from "express";
import { 
  getPlayers, 
  getPlayerById, 
  createPlayer, 
  updatePlayer, 
  deletePlayer 
} from "../repositories/playerRepository";
import { successResponse, errorResponse } from "../models/Match";


export const getAllPlayers = async (req: Request, res: Response) => {
  try {
    const players = await getPlayers(req.query.teamId as string);
    res.json(successResponse(players));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getPlayer = async (req: Request, res: Response) => {
    try {
      const player = await getPlayerById(req.params.id);
      res.json(successResponse(player));
    } catch (error) {
      res.status(500).json(errorResponse("Internal server error"));
    }
  };
  
  export const createPlayerHandler = async (req: Request, res: Response) => {
    try {
      const playerId = await createPlayer({
        ...req.body,
        runs: Number(req.body.runs),
        wickets: Number(req.body.wickets),
        average: Number(req.body.average)
      });
      res.status(201).json(successResponse({ id: playerId }, "Player created"));
    } catch (error) {
      res.status(500).json(errorResponse("Internal server error"));
    }
  };

  export const updatePlayerHandler = async (req: Request, res: Response) => {
    try {
      await updatePlayer(req.params.id, req.body);
      res.json(successResponse({}, "Player updated"));
    } catch (error) {
      res.status(500).json(errorResponse("Internal server error"));
    }
  };
  
  export const deletePlayerHandler = async (req: Request, res: Response) => {
    try {
      await deletePlayer(req.params.id);
      res.json(successResponse({}, "Player deleted"));
    } catch (error) {
      res.status(500).json(errorResponse("Internal server error"));
    }
  };