import { Request, Response, NextFunction } from "express";
import axios from "axios";
import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { AuthenticationError } from "../errors/errors";
import { getErrorMessage, getErrorCode } from "../utils/errorUtils";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new AuthenticationError("No token provided", "TOKEN_NOT_FOUND"));
  }

  try {
    const decoded = jwt.decode(token, { complete: true }) as any;

    if (!decoded || !decoded.payload) {
      return next(new AuthenticationError("Invalid token", "TOKEN_INVALID"));
    }

    // Optional: you can inspect the payload for role, uid, etc.
    res.locals.uid = decoded.payload.user_id || decoded.payload.sub;
    res.locals.role = decoded.payload.role || "user";
    next();
  } catch (error) {
    return next(
      new AuthenticationError("Error decoding token", getErrorCode(error))
    );
  }
};