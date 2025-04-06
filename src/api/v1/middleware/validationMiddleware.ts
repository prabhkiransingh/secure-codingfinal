import { Request, Response, NextFunction } from "express";
import Joi from "joi";
// Internal module imports
import { MiddlewareFunction } from "../types/express"
// Validate request body against a given Joi schema
export const validateBody = (schema: Joi.ObjectSchema): MiddlewareFunction => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
      return;
    }
    next();
  };
};

// Validate route parameters against a given Joi schema
export const validateParams = (schema: Joi.ObjectSchema): MiddlewareFunction => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.params);
    if (error) {
      res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
      return;
    }
    next();
  };
};
