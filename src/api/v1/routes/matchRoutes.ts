import express from "express";
import Joi from "joi";
import { validateRequest } from "../middleware/validationMiddleware";
import { matchSchema } from "../Schemas/Match";
import * as matchController from "../controllers/matchController";
import { authenticate } from "../middleware/authenticate";
import  isAuthorized  from "../middleware/authorize";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Matches
 *   description: API for managing cricket matches
 */

/**
 * @openapi
 * /api/v1/matches:
 *   get:
 *     summary: Retrieve a list of matches
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 */
router.get("/", authenticate, matchController.getAllMatches);

/**
 * @openapi
 * /api/v1/matches/random:
 *   get:
 *     summary: Retrieve a random match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A random match
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 */
router.get("/random", authenticate, matchController.getRandomMatch);

/**
 * @openapi
 * /api/v1/matches/{id}:
 *   get:
 *     summary: Retrieve a single match by ID
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
 *         description: A match object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 */
router.get(
  "/:id",
  authenticate,
  validateRequest(Joi.object({ id: Joi.string().required() })),
  matchController.getMatch
);

/**
 * @openapi
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
 *             $ref: '#/components/schemas/Match'
 *     responses:
 *       201:
 *         description: Match created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ allowSameUser: false, hasRole: ["admin", "user"] }),
  validateRequest(matchSchema),
  matchController.createMatchHandler
);

/**
 * @openapi
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
 *             $ref: '#/components/schemas/Match'
 *     responses:
 *       200:
 *         description: Match updated successfully
 *       400:
 *         description: Invalid input
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({ allowSameUser: false, hasRole: ["admin", "user"] }),
  validateRequest(Joi.object({ id: Joi.string().required() })),
  validateRequest(matchSchema),
  matchController.updateMatchHandler
);

/**
 * @openapi
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
 *         description: Match deleted successfully
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ allowSameUser: false, hasRole: ["admin", "user"] }),
  validateRequest(Joi.object({ id: Joi.string().required() })),
  matchController.deleteMatchHandler
);

export default router;
