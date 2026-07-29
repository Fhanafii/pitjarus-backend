import { Request, Response } from "express";

import { AuthService } from "./auth.service";

import { successResponse } from "../../utils/response";

import { asyncHandler } from "../../utils/asyncHandler";

import { loginSchema } from "./auth.validation";

export class AuthController {
  constructor(
    private readonly authService =
      new AuthService()
  ) {}

  login = asyncHandler(async (req: Request, res: Response) => {

    const body = loginSchema.parse(req.body);

    const result =
      await this.authService.login(
        body.username,
        body.password
      );

    return successResponse(
      res,
      result,
      "Login berhasil"
    );
  });
}