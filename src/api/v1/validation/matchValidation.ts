import Joi from "joi";

// Schema for validating the request body for creating/updating a match
export const matchSchema = Joi.object({
  team1: Joi.string().required(),
  team2: Joi.string().required(),
  date: Joi.date().required(),
  venue: Joi.string().required(),
  status: Joi.string()
    .valid("upcoming", "in-progress", "completed")
    .required(),
  score: Joi.object()
    .pattern(/.*/, Joi.number().min(0))
    .required(),
});

// Schema for validating route parameters (e.g., /matches/:id)
export const matchIdSchema = Joi.object({
  id: Joi.string().required(), // You can adjust this (e.g., regex for MongoDB ObjectId) if needed.
});
