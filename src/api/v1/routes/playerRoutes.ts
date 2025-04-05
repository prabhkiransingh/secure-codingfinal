import express from "express";
import { validateBody, validateParams } from "../middleware/validationMiddleware";
import { playerSchema } from "../validation/playerValidation";
import { requireAdmin } from "../middleware/authMiddleware";
import * as playerController from "../controllers/playerController";
import Joi from "joi"; 

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: API for managing cricket players
 */

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Retrieve a list of players
 *     description: Retrieve a list of all players.
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: A list of players.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/",
  async (req, res) => await playerController.getAllPlayers(req, res)
);

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Retrieve a single player by ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The player ID.
 *     responses:
 *       200:
 *         description: A single player.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/:id",
  validateParams(Joi.object({ id: Joi.string().required() })), 
  async (req, res) => await playerController.getPlayer(req, res)
);

/**
 * @swagger
 * /players:
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
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       201:
 *         description: Player created successfully.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  requireAdmin,
  validateBody(playerSchema),
  async (req, res) => await playerController.createPlayerHandler(req, res)
);

/**
 * @swagger
 * /players/{id}:
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
 *         description: The player ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: Player updated successfully.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  requireAdmin,
  validateParams(Joi.object({ id: Joi.string().required() })), 
  validateBody(playerSchema),
  async (req, res) => await playerController.updatePlayerHandler(req, res)
);

/**
 * @swagger
 * /players/{id}:
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
 *         description: The player ID.
 *     responses:
 *       200:
 *         description: Player deleted successfully.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/:id",
  requireAdmin,
  validateParams(Joi.object({ id: Joi.string().required() })), 
  async (req, res) => await playerController.deletePlayerHandler(req, res)
);

export default router;
