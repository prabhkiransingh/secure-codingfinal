// External library imports
import { Request, Response, NextFunction } from "express";
import { UserRecord } from "firebase-admin/auth";

// Internal module imports
import { auth } from "../../../../config/firebaseConfig";
import { successResponse } from "../models/Matchmodels";

const OK: number = 200;

/**
 * Retrieves editor details based on the provided editor ID.
 * @param {Request} req - The request object containing the editor ID in params.
 * @param {Response} res - The response object used to send back the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getEditorDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const editor: UserRecord = await auth.getUser(id);
    res.status(OK).json(successResponse(editor));
  } catch (error) {
    next(error);
  }
};

/**
 * Updates editor details using the provided data.
 * @param {Request} req - The request object containing the editor ID in params and update data in the body.
 * @param {Response} res - The response object used to send back the result.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updateEditorDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedEditor: UserRecord = await auth.updateUser(id, updateData);
    res.status(OK).json(successResponse(updatedEditor));
  } catch (error) {
    next(error);
  }
};
