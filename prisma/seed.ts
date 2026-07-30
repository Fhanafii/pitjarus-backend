import { PrismaClient } from "@prisma/client";
import { logger } from "../src/config/logger";

import { seedUsers } from "./seed/users.seed";
import { seedStores } from "./seed/stores.seed";
import { seedProducts } from "./seed/products.seed";

const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
  await seedStores(prisma);
  // await seedProducts(prisma); // Masih error SKU field

  logger.info("Database seeded successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    logger.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });