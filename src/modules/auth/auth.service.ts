import { UserRepository } from "../users/user.repository";

import { comparePassword } from "../../services/password.service";

import {
  generateToken,
} from "../../services/jwt.service";
import { AppError } from "../../exceptions/AppError";

export class AuthService {
  constructor(
    private readonly userRepository =
      new UserRepository()
  ) {}

  async login(username: string, password: string) {
    const user =
      await this.userRepository.findByUsername(
        username
      );

    if (!user) {
      throw new AppError("Username atau password salah", 401);
    }

    const isValid =
      await comparePassword(
        password,
        user.passwordHash
      );

    if (!isValid) {
      throw new AppError("Username atau password salah", 401);
    }

    const token = generateToken({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
    });

    const expiredAt = new Date();

    expiredAt.setHours(
      expiredAt.getHours() + 24
    );

    return {
      id: user.id,
      name: user.fullName,
      token,
      expired_at: expiredAt,
    };
  }
}