import express, { Router } from "express";
import { getUserDetails } from "../controllers/userControllers";
import { authenticate }from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

router.get(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    getUserDetails
);


export default router;