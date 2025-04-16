import Joi from "joi";

export const teamSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  country: Joi.string().required(),
  players: Joi.array().items(Joi.string()).required()
  
});