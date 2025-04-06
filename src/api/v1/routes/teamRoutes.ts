import express from "express";
import { validateBody, validateParams } from "../middleware/validationMiddleware";
import { teamSchema } from "../Schemas/Team";
import { requireAdmin } from "../middleware/authMiddleware";
import * as teamController from "../controllers/teamController";
import Joi from "joi";

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
 *     responses:
 *       200:
 *         description: A list of teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required: [name, country, players]
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: India
 *                   country:
 *                     type: string
 *                     example: India
 *                   players:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Virat Kohli", "Rohit Sharma"]
 */
router.get("/", teamController.getAllTeams);

/**
 * @openapi
 * /api/v1/teams/{id}:
 *   get:
 *     summary: Retrieve a single team by ID
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The team ID.
 *     responses:
 *       200:
 *         description: A single team.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [name, country, players]
 *               properties:
 *                 name:
 *                   type: string
 *                   example: India
 *                 country:
 *                   type: string
 *                   example: India
 *                 players:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Virat Kohli", "Rohit Sharma"]
 *       400:
 *         description: Bad Request.
 *       404:
 *         description: Team not found.
 */
router.get(
  "/:id",
  validateParams(Joi.object({ id: Joi.string().required() })),
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
 *             type: object
 *             required: [name, country, players]
 *             properties:
 *               name:
 *                 type: string
 *                 example: India
 *               country:
 *                 type: string
 *                 example: India
 *               players:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Virat Kohli", "Rohit Sharma"]
 *     responses:
 *       201:
 *         description: Team created successfully.
 *       400:
 *         description: Bad Request.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */
router.post("/",  validateBody(teamSchema), teamController.createTeamHandler);

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
 *         description: The team ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, country, players]
 *             properties:
 *               name:
 *                 type: string
 *                 example: India
 *               country:
 *                 type: string
 *                 example: India
 *               players:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Virat Kohli", "Rohit Sharma"]
 *     responses:
 *       200:
 *         description: Team updated successfully.
 *       400:
 *         description: Bad Request.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Team not found.
 */
router.put(
  "/:id",
  validateParams(Joi.object({ id: Joi.string().required() })),
  validateBody(teamSchema),
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
 *         description: The team ID.
 *     responses:
 *       200:
 *         description: Team deleted successfully.
 *       400:
 *         description: Bad Request.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Team not found.
 */
router.delete(
  "/:id",
  validateParams(Joi.object({ id: Joi.string().required() })),
  teamController.deleteTeamHandler
);

export default router;
