import express from "express";
import { validateBody, validateParams } from "../middleware/validationMiddleware";
import { playerSchema } from "../Schemas/Player";
import { requireAdmin } from "../middleware/authMiddleware";
import * as playerController from "../controllers/playerController";
import Joi from "joi";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Players
 *   description: API for managing cricket players
 */

/**
 * @openapi
 * /api/v1/players:
 *   get:
 *     summary: Retrieve a list of players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: A list of players.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required: [name, teamId, role, runs, wickets, average]
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Virat Kohli
 *                   teamId:
 *                     type: string
 *                     example: 64fb19c58b8e4e001e558abe
 *                   role:
 *                     type: string
 *                     enum: [batsman, bowler, all-rounder, wicketkeeper]
 *                     example: batsman
 *                   runs:
 *                     type: number
 *                     minimum: 0
 *                     example: 12000
 *                   wickets:
 *                     type: number
 *                     minimum: 0
 *                     example: 50
 *                   average:
 *                     type: number
 *                     minimum: 0
 *                     example: 55.45
 */
router.get("/", async (req, res) => await playerController.getAllPlayers(req, res));

/**
 * @openapi
 * /api/v1/players/{id}:
 *   get:
 *     summary: Retrieve a single player by ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single player.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [name, teamId, role, runs, wickets, average]
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Virat Kohli
 *                 teamId:
 *                   type: string
 *                   example: 64fb19c58b8e4e001e558abe
 *                 role:
 *                   type: string
 *                   enum: [batsman, bowler, all-rounder, wicketkeeper]
 *                   example: batsman
 *                 runs:
 *                   type: number
 *                   example: 12000
 *                 wickets:
 *                   type: number
 *                   example: 50
 *                 average:
 *                   type: number
 *                   example: 55.45
 */
router.get(
  "/:id",
  validateParams(Joi.object({ id: Joi.string().required() })),
  async (req, res) => await playerController.getPlayer(req, res)
);

/**
 * @openapi
 * /api/v1/players:
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, teamId, role, runs, wickets, average]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Virat Kohli
 *               teamId:
 *                 type: string
 *                 example: 64fb19c58b8e4e001e558abe
 *               role:
 *                 type: string
 *                 enum: [batsman, bowler, all-rounder, wicketkeeper]
 *                 example: batsman
 *               runs:
 *                 type: number
 *                 minimum: 0
 *                 example: 12000
 *               wickets:
 *                 type: number
 *                 minimum: 0
 *                 example: 50
 *               average:
 *                 type: number
 *                 minimum: 0
 *                 example: 55.45
 *     responses:
 *       201:
 *         description: Player created successfully.
 */
router.post(
  "/",
  validateBody(playerSchema),
  async (req, res) => await playerController.createPlayerHandler(req, res)
);

/**
 * @openapi
 * /api/v1/players/{id}:
 *   put:
 *     summary: Update an existing player by ID
 *     tags: [Players]
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
 *             required: [name, teamId, role, runs, wickets, average]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Virat Kohli
 *               teamId:
 *                 type: string
 *                 example: 64fb19c58b8e4e001e558abe
 *               role:
 *                 type: string
 *                 enum: [batsman, bowler, all-rounder, wicketkeeper]
 *                 example: batsman
 *               runs:
 *                 type: number
 *                 minimum: 0
 *                 example: 12000
 *               wickets:
 *                 type: number
 *                 minimum: 0
 *                 example: 50
 *               average:
 *                 type: number
 *                 minimum: 0
 *                 example: 55.45
 *     responses:
 *       200:
 *         description: Player updated successfully.
 */
router.put(
  "/:id",
  validateParams(Joi.object({ id: Joi.string().required() })),
  validateBody(playerSchema),
  async (req, res) => await playerController.updatePlayerHandler(req, res)
);

/**
 * @openapi
 * /api/v1/players/{id}:
 *   delete:
 *     summary: Delete a player by ID
 *     tags: [Players]
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
 *         description: Player deleted successfully.
 */
router.delete(
  "/:id",
  validateParams(Joi.object({ id: Joi.string().required() })),
  async (req, res) => await playerController.deletePlayerHandler(req, res)
);

export default router;
