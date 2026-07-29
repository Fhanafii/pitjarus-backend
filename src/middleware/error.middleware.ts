import { NextFunction, Request, Response } from "express";
import { AppError } from "../exceptions/AppError";
import { logger } from "../config/logger";
import { ZodError } from "zod";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {

  logger.error(err);

  if (err instanceof AppError) {

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors ?? null
    });
  }

  // Zod Validation Error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });

}