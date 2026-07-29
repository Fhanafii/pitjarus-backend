import app from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { prisma } from "./config/prisma";

const server = app.listen(env.port, () => {
    logger.info(`Server running on port ${env.port}`);
});

const shutdown = async () => {
    logger.info("Closing server...");

    await prisma.$disconnect();

    server.close(() => {
        process.exit(0);
    });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);