import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export async function seedUsers(prisma: PrismaClient) {
  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: {
      username: "fajar",
    },
    update: {},
    create: {
      username: "fajar",
      fullName: "Fajar",
      passwordHash,
    },
  });
}