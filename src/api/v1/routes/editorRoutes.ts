import express from "express";
import { getEditorDetails, updateEditorDetails } from "../controllers/editorController";
import { authenticate } from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
const router: express.Router = express.Router();


router.get(
  "/:id",
  authenticate,isAuthorized
  ({ hasRole: ["editor"] }),
  getEditorDetails
);

router.put(
  "/:id",
  authenticate,isAuthorized
  ({ hasRole: ["editor"] }),
  updateEditorDetails
);

export default router;
