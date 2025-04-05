
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
  