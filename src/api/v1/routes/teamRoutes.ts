import express from "express";
import { validateBody, validateParams } from "../middleware/validationMiddleware";
import { teamSchema } from "../validation/teamValidation";
import { requireAdmin } from "../middleware/authMiddleware";
import * as teamController from "../controllers/teamController";
import Joi from "joi"; // Import directly from "joi"

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: API for managing cricket teams
 */

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Retrieve a list of teams
 *     description: Retrieve a list of all teams.
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: A list of teams.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/",
  async (req, res) => await teamController.getAllTeams(req, res)
);

/**
 * @swagger
 * /teams/{id}:
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
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/:id",
  validateParams(Joi.object({ id: Joi.string().required() })), 
  async (req, res) => await teamController.getTeam(req, res)
);

/**
 * @swagger
 * /teams:
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
 *         description: Team created successfully.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  requireAdmin,
  validateBody(teamSchema),
  async (req, res) => await teamController.createTeamHandler(req, res)
);

/**
 * @swagger
 * /teams/{id}:
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
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       200:
 *         description: Team updated successfully.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  requireAdmin,
  validateParams(Joi.object({ id: Joi.string().required() })), 
  validateBody(teamSchema),
  async (req, res) => await teamController.updateTeamHandler(req, res)
);

/**
 * @swagger
 * /teams/{id}:
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
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/:id",
  requireAdmin,
  validateParams(Joi.object({ id: Joi.string().required() })), 
  async (req, res) => await teamController.deleteTeamHandler(req, res)
);

export default router;
