import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  id: number;
  username: string;
  fullName: string;
}

const EXPIRES_IN = "24h";

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: EXPIRES_IN,
  });
};

// Still not used
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
};

// Still not used
export const getTokenExpiredAt = (): Date => {
  const expiredAt = new Date();
  expiredAt.setHours(expiredAt.getHours() + 24);
  return expiredAt;
};