import express from "express";
import { setCustomClaims } from "../controllers/adminConroller";
import { authenticate } from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: express.Router = express.Router();


router.post(
    "/setCustomClaims",
    authenticate,
    isAuthorized({
      hasRole: ["admin","user"], 
    }),
    setCustomClaims
  );
  
export default router;