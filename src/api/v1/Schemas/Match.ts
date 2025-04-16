import Joi from "joi";

export const matchSchema = Joi.object({
  id: Joi.string().required(),
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


