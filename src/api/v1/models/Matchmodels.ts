/**
 * @openapi
 * components:
 *   schemas:
 *     Match:
 *       type: object
 *       required:
 *         - id
 *         - team1
 *         - team2
 *         - date
 *         - venue
 *         - status
 *         - score
 *       properties:
 *         id:
 *           type: string
 *         team1:
 *           type: string
 *         team2:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         venue:
 *           type: string
 *         status:
 *           type: string
 *           enum: [upcoming, in-progress, completed]
 *         score:
 *           type: object
 *           additionalProperties:
 *             type: number
 */


export interface Match {
    id: string;
    team1: string;
    team2: string;
    date: Date;
    venue: string;
    status: "upcoming" | "in-progress" | "completed";
    score: {
      [team: string]: number;
    };
  }
  
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    code?: string;
  }
  
  export const successResponse = <T>(
    data?: T,
    message?: string
  ): ApiResponse<T> => ({
    success: true,
    data,
    message,
  });
  
  export const errorResponse = (
    message: string,
    code?: string
  ): ApiResponse<null> => ({
    success: false,
    message,
    code,
  });
  