import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { MiddlewareFunction } from "../types/express";

/**
 * General validation function that validates data against a Joi schema.
 * @param schema - Joi schema for validation
 * @param data - Data to be validated
 * @throws Error if validation fails
 */
const validate = <T>(schema: ObjectSchema<T>, data: T): void => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    throw new Error(
      `Validation error: ${error.details.map((x) => x.message).join(", ")}`
    );
  }
};

/**
 * Middleware to validate request body against a Joi schema.
 * @param schema - Joi schema for validation
 * @returns Middleware function
 */
export const validateBody = (schema: ObjectSchema): MiddlewareFunction => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      validate(schema, req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
};

/**
 * Middleware to validate request parameters against a Joi schema.
 * @param schema - Joi schema for validation
 * @returns Middleware function
 */
export const validateParams = (schema: ObjectSchema): MiddlewareFunction => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      validate(schema, req.params);
      next();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
};

/**
 * Base class for application-specific errors.
 */
class BaseError extends Error {
  public code: string | number;

  constructor(message: string, code: string | number) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Error for authentication-related issues.
 */
export class AuthenticationError extends BaseError {
  constructor(message: string, code: string | number = "AUTH_ERROR") {
    super(message, code);
  }
}

/**
 * Error for authorization-related issues.
 */
export class AuthorizationError extends BaseError {
  constructor(message: string, code: string | number = "AUTHZ_ERROR") {
    super(message, code);
  }
}

/**
 * Error for repository-related issues.
 */
export class RepositoryError extends BaseError {
  constructor(message: string, code: string | number = "REPO_ERROR") {
    super(message, code);
  }
}

/**
 * Error for service-related issues.
 */
export class ServiceError extends BaseError {
  constructor(message: string, code: string | number = "SERVICE_ERROR") {
    super(message, code);
  }
}
