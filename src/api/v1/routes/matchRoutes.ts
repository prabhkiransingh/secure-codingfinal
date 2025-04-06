import express from "express";
import { validateBody, validateParams } from "../middleware/validationMiddleware";
import { matchSchema, matchIdSchema } from "../Schemas/Match";
import { requireAdmin } from "../middleware/authMiddleware";
import * as matchController from "../controllers/matchController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: API for managing cricket matches
 */

/**
 * @swagger
 * /api/v1/matches:
 *   get:
 *     summary: Retrieve a list of matches
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: A list of matches.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   team1:
 *                     type: string
 *                   team2:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   venue:
 *                     type: string
 *                   status:
 *                     type: string
 *                   score:
 *                     type: object
 */
router.get("/", async (req, res) => await matchController.getAllMatches(req, res));

/**
 * @swagger
 * /api/v1/matches/random:
 *   get:
 *     summary: Retrieve a random match
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: A random match.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [team1, team2, date, venue, status, score]
 *               properties:
 *                 team1:
 *                   type: string
 *                   example: India
 *                 team2:
 *                   type: string
 *                   example: Australia
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-04-06T14:00:00Z
 *                 venue:
 *                   type: string
 *                   example: Wankhede Stadium
 *                 status:
 *                   type: string
 *                   enum: [upcoming, in-progress, completed]
 *                   example: upcoming
 *                 score:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *                   example:
 *                     India: 250
 *                     Australia: 245
 */
router.get("/random", async (req, res) => await matchController.getRandomMatch(req, res));

/**
 * @swagger
 * /api/v1/matches/{id}:
 *   get:
 *     summary: Retrieve a single match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A match object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [team1, team2, date, venue, status, score]
 *               properties:
 *                 team1:
 *                   type: string
 *                   example: India
 *                 team2:
 *                   type: string
 *                   example: Australia
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-04-06T14:00:00Z
 *                 venue:
 *                   type: string
 *                   example: Wankhede Stadium
 *                 status:
 *                   type: string
 *                   enum: [upcoming, in-progress, completed]
 *                   example: upcoming
 *                 score:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *                   example:
 *                     India: 250
 *                     Australia: 245
 */
router.get("/:id", validateParams(matchIdSchema), async (req, res) => await matchController.getMatch(req, res));

/**
 * @swagger
 * /api/v1/matches:
 *   post:
 *     summary: Create a new match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [team1, team2, date, venue, status, score]
 *             properties:
 *               team1:
 *                 type: string
 *                 example: India
 *               team2:
 *                 type: string
 *                 example: Australia
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-04-06T14:00:00Z
 *               venue:
 *                 type: string
 *                 example: Wankhede Stadium
 *               status:
 *                 type: string
 *                 enum: [upcoming, in-progress, completed]
 *                 example: upcoming
 *               score:
 *                 type: object
 *                 additionalProperties:
 *                   type: number
 *                 example:
 *                   India: 250
 *                   Australia: 245
 *     responses:
 *       201:
 *         description: Match created successfully.
 */
router.post("/", validateBody(matchSchema), async (req, res) => await matchController.createMatchHandler(req, res));

/**
 * @swagger
 * /api/v1/matches/{id}:
 *   put:
 *     summary: Update a match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [team1, team2, date, venue, status, score]
 *             properties:
 *               team1:
 *                 type: string
 *                 example: India
 *               team2:
 *                 type: string
 *                 example: Australia
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-04-06T14:00:00Z
 *               venue:
 *                 type: string
 *                 example: Wankhede Stadium
 *               status:
 *                 type: string
 *                 enum: [upcoming, in-progress, completed]
 *                 example: upcoming
 *               score:
 *                 type: object
 *                 additionalProperties:
 *                   type: number
 *                 example:
 *                   India: 250
 *                   Australia: 245
 *     responses:
 *       200:
 *         description: Match updated successfully.
 */
router.put(
  "/:id",
  validateParams(matchIdSchema),
  validateBody(matchSchema),
  async (req, res) => await matchController.updateMatchHandler(req, res)
);

/**
 * @swagger
 * /api/v1/matches/{id}:
 *   delete:
 *     summary: Delete a match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Match deleted successfully.
 */
router.delete(
  "/:id",
  validateParams(matchIdSchema),
  async (req, res) => await matchController.deleteMatchHandler(req, res)
);

export default router;
