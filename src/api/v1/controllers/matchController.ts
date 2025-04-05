// controllers/matchController.ts
import { Request, Response } from "express";
import { 
  getMatches, 
  getMatchById, 
  createMatch, 
  updateMatch, 
  deleteMatch 
} from "../repositories/matchRepository";
import { successResponse, errorResponse } from "../models/Match";

export const getAllMatches = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    const matches = await getMatches(category);
    res.json(successResponse(matches));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getRandomMatch = async (req: Request, res: Response) => {
  try {
    const matches = await getMatches();
    const randomIndex = Math.floor(Math.random() * matches.length);
    res.json(successResponse(matches[randomIndex]));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getMatch = async (req: Request, res: Response) => {
  try {
    const match = await getMatchById(req.params.id);
    res.json(successResponse(match));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const createMatchHandler = async (req: Request, res: Response) => {
  try {
    const matchId = await createMatch({
      ...req.body,
      date: new Date(req.body.date),
      status: req.body.status,
      score: req.body.score,
    });
    res.status(201).json(successResponse({ id: matchId }, "Match created"));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const updateMatchHandler = async (req: Request, res: Response) => {
  try {
    await updateMatch(req.params.id, req.body);
    res.json(successResponse({}, "Match updated"));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const deleteMatchHandler = async (req: Request, res: Response) => {
  try {
    await deleteMatch(req.params.id);
    res.json(successResponse({}, "Match deleted"));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};