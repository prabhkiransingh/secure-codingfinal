import Joi from "joi";

export const teamSchema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().required(),
  players: Joi.array().items(Joi.string()).required()
  
});