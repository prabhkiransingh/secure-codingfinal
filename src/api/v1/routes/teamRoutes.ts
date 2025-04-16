import express from "express";
import Joi from "joi";
import { validateRequest } from "../middleware/validationMiddleware";
import { teamSchema } from "../Schemas/Team";
import { isAuthorized } from "../middleware/authorize";
import { authenticate } from "../middleware/authenticate";
import * as teamController from "../controllers/teamController";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Teams
 *   description: API for managing cricket teams
 */

/**
 * @openapi
 * /api/v1/teams:
 *   get:
 *     summary: Retrieve a list of teams
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
router.get("/", authenticate, teamController.getAllTeams);

/**
 * @openapi
 * /api/v1/teams/{id}:
 *   get:
 *     summary: Retrieve a single team by ID
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The team ID
 *     responses:
 *       200:
 *         description: A team object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Team not found
 */
router.get(
  "/:id",
  authenticate,
  validateRequest(Joi.object({ id: Joi.string().required() })),
  teamController.getTeam
);

/**
 * @openapi
 * /api/v1/teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       201:
 *         description: Team created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ allowSameUser: false, hasRole: ["admin", "user"] }),
  validateRequest(teamSchema),
  teamController.createTeamHandler
);

/**
 * @openapi
 * /api/v1/teams/{id}:
 *   put:
 *     summary: Update an existing team by ID
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The team ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Team not found
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({ allowSameUser: false, hasRole: ["admin", "user"] }),
  validateRequest(Joi.object({ id: Joi.string().required() })),
  validateRequest(teamSchema),
  teamController.updateTeamHandler
);

/**
 * @openapi
 * /api/v1/teams/{id}:
 *   delete:
 *     summary: Delete a team by ID
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The team ID
 *     responses:
 *       200:
 *         description: Team deleted successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Team not found
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ allowSameUser: false, hasRole: ["admin", "user"] }),
  validateRequest(Joi.object({ id: Joi.string().required() })),
  teamController.deleteTeamHandler
);

export default router;
