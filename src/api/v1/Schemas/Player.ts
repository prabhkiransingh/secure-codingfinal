import Joi from "joi";

export const playerSchema = Joi.object({
  id: Joi.string(), // Optional ID field
  name: Joi.string().required(),
  teamId: Joi.string().required(),
  role: Joi.string()
    .valid("batsman", "bowler", "all-rounder", "wicketkeeper")
    .required(),
  runs: Joi.number().min(0).required(),
  wickets: Joi.number().min(0).required(),
  average: Joi.number().min(0).required()
});
