import { NextFunction, Request, Response } from "express";

import { verifyToken } from "../services/jwt.service";
import { AppError } from "../exceptions/AppError";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(
      new AppError("Authorization header tidak ditemukan", 401)
    );
  }

  if (!authorization.startsWith("Bearer ")) {
    return next(
      new AppError("Format token tidak valid", 401)
    );
  }

  const token = authorization.replace("Bearer ", "").trim();

  if (!token) {
    return next(
      new AppError("Token tidak ditemukan", 401)
    );
  }

  try {
    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch (error) {
    return next(
      new AppError("Token tidak valid atau telah kedaluwarsa", 401)
    );
  }
};