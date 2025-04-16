import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
// Internal module imports
import { MiddlewareFunction, RequestData } from "../types/express"
// Validate request body against a given Joi schema
export const validate = <T>(schema: ObjectSchema<T>, data: T): void => {
	const { error } = schema.validate(data, { abortEarly: false });
	if (error) {
		throw new Error(
			`Validation error: ${error.details
				.map((x) => x.message)
				.join(", ")}`
		);
	}
};

export const validateRequest = (schema: ObjectSchema): MiddlewareFunction => {
	return (req: Request, res: Response, next: NextFunction) => {
	  try {
		const data = { ...req.body, ...req.params, ...req.query };
  
		const { error } = schema.validate(data, {
		  abortEarly: false,
		  allowUnknown: true // ✅ IMPORTANT: allow extra keys like id
		});
  
		if (error) {
		  throw new Error(
			`Validation error: ${error.details.map((x) => x.message).join(", ")}`
		  );
		}
  
		next();
	  } catch (error) {
		res.status(400).json({ error: (error as Error).message });
	  }
	};
  };
  