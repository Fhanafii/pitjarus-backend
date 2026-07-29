import { Response } from "express";

export const successResponse = (
  res: Response,
  data: unknown = null,
  message = "Success",
  statusCode = 200,
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(pagination && { pagination }),
  });
};

export const errorResponse = (
  res: Response,
  message = "Internal Server Error",
  statusCode = 500,
  errors?: unknown
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors: errors ?? null
  });
};