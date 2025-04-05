import express from "express";
import { validateBody, validateParams } from "../middleware/validationMiddleware";
import { matchSchema, matchIdSchema } from "../validation/matchValidation";
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
 * /matches:
 *   get:
 *     summary: Retrieve a list of matches
 *     description: Retrieve a list of matches, optionally filtered by category.
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: A list of matches.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/",
  async (req: express.Request, res: express.Response) =>
    await matchController.getAllMatches(req, res)
);

/**
 * @swagger
 * /matches/random:
 *   get:
 *     summary: Retrieve a random match
 *     description: Retrieve a random match from the available matches.
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: A random match.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/random",
  async (req: express.Request, res: express.Response) =>
    await matchController.getRandomMatch(req, res)
);

/**
 * @swagger
 * /matches/{id}:
 *   get:
 *     summary: Retrieve a single match by ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The match ID.
 *     responses:
 *       200:
 *         description: A single match.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/:id",
  validateParams(matchIdSchema),
  async (req: express.Request, res: express.Response) =>
    await matchController.getMatch(req, res)
);

/**
 * @swagger
 * /matches:
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
 *             $ref: '#/components/schemas/Match'
 *     responses:
 *       201:
 *         description: Match created successfully.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  requireAdmin,
  validateBody(matchSchema),
  async (req: express.Request, res: express.Response) =>
    await matchController.createMatchHandler(req, res)
);

/**
 * @swagger
 * /matches/{id}:
 *   put:
 *     summary: Update an existing match by ID
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The match ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Match'
 *     responses:
 *       200:
 *         description: Match updated successfully.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  requireAdmin,
  validateParams(matchIdSchema),
  validateBody(matchSchema),
  async (req: express.Request, res: express.Response) =>
    await matchController.updateMatchHandler(req, res)
);

/**
 * @swagger
 * /matches/{id}:
 *   delete:
 *     summary: Delete a match by ID
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The match ID.
 *     responses:
 *       200:
 *         description: Match deleted successfully.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/:id",
  requireAdmin,
  validateParams(matchIdSchema),
  async (req: express.Request, res: express.Response) =>
    await matchController.deleteMatchHandler(req, res)
);

export default router;
