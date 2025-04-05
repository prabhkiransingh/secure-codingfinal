import { Request, Response, NextFunction } from "express";
import { auth } from "../../../../config/firebaseConfig";
import { AuthenticationError } from "../errors/errors";

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AuthenticationError("Unauthorized: No token provided", "TOKEN_NOT_FOUND");
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    res.locals.uid = decodedToken.uid;
    res.locals.role = decodedToken.role; // Assuming custom claims include 'role'
    next();
  } catch (error) {
    throw new AuthenticationError("Unauthorized: Invalid token", "TOKEN_INVALID");
  }
};

export default authenticate;
