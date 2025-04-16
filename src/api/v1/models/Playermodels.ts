/**
 * @openapi
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - teamId
 *         - role
 *         - runs
 *         - wickets
 *         - average
 *       properties:
 *         id:
 *           type: string
 *           description: Unique player ID
 *         name:
 *           type: string
 *           description: Name of the player
 *           example: Virat Kohli
 *         teamId:
 *           type: string
 *           description: Associated team ID
 *           example: 64fb19c58b8e4e001e558abe
 *         role:
 *           type: string
 *           enum: [batsman, bowler, all-rounder, wicketkeeper]
 *           example: batsman
 *         runs:
 *           type: number
 *           minimum: 0
 *           example: 12000
 *         wickets:
 *           type: number
 *           minimum: 0
 *           example: 50
 *         average:
 *           type: number
 *           minimum: 0
 *           example: 55.45
 */


export interface Player {
    id: string;
    name: string;
    teamId: string;
    role: "batsman" | "bowler" | "all-rounder" | "wicketkeeper";
    runs: number;
    wickets: number;
    average: number;
    
  }
  