/**
 * @openapi
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - country
 *         - players
 *       properties:
 *         id:
 *           type: string
 *           description: Unique team ID
 *         name:
 *           type: string
 *           description: Team name
 *           example: India
 *         country:
 *           type: string
 *           description: Country the team represents
 *           example: India
 *         players:
 *           type: array
 *           description: List of player names or IDs
 *           items:
 *             type: string
 *           example: ["Virat Kohli", "Rohit Sharma"]
 */

export interface Team {
    id: string;
    name: string;
    country: string;
    players: string[]; 
    
  }