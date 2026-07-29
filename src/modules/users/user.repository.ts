import { prisma } from "../../config/prisma";
import { User } from "@prisma/client";

export class UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: {
    username: string;
    fullName: string;
    passwordHash: string;
  }) {
    return prisma.user.create({
      data,
    });
  }
}