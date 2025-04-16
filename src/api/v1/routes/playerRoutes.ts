import express from "express";
import { validateRequest } from "../middleware/validationMiddleware";
import { isAuthorized } from "../middleware/authorize";
import { playerSchema} from "../Schemas/Player";
import * as playerController from "../controllers/playerController";
import { authenticate } from "../middleware/authenticate"; 

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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 */
router.get("/", authenticate, async (req, res) => await playerController.getAllPlayers(req, res));

/**
 * @openapi
 * /api/v1/players/{id}:
 *   get:
 *     summary: Retrieve a single player by ID
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
 *         description: A player object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 */
router.get("/:id", authenticate, validateRequest(playerSchema), async (req, res) => await playerController.getPlayer(req, res));

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
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       201:
 *         description: Player created successfully
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ allowSameUser: false, hasRole: ["admin", "user"] }),
  validateRequest(playerSchema),
  playerController.createPlayerHandler
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
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: Player updated successfully
 *       400:
 *         description: Invalid input
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({ allowSameUser: false, hasRole: ["admin", "user"] }),
  validateRequest(playerSchema),
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
 *         description: Player deleted successfully
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ allowSameUser: false, hasRole: ["admin", "user"] }),
  async (req, res) => await playerController.deletePlayerHandler(req, res)
);

export default router;
