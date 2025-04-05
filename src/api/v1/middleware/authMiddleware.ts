import { Request, Response, NextFunction } from "express";

import { initializeApp, cert } from "firebase-admin/app";
import * as serviceAccount from "../../../../cricket-c5810-firebase-adminsdk-fbsvc-0cc9b24a33.json";
declare global {
    namespace Express {
      interface Request {
        user?: {
          uid: string;
          email: string;
          customClaims?: { admin: boolean };
        };
      }
    }
  }
// Initialize Firebase Admin SDK (if not already done in another file)
initializeApp({
  credential: cert(serviceAccount as any),
});

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

}

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // First ensure the user is authenticated
  await requireAuth(req, res, (err) => {
    if (err) return next(err);
    // Check if user has admin role via custom claims
    if (req.user?.customClaims?.admin) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
  });
};