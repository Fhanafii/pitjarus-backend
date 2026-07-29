import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";
import { logger } from "../src/config/logger";

const prisma = new PrismaClient();

async function main() {

    const user =
        await prisma.user.findUnique({
            where: {
                username: "fajar"
            }
        });

    if (user) {
        logger.info("User already exists");
        return;
    }

    const passwordHash =
        await bcrypt.hash("123456", 10);
        
    await prisma.user.create({
        data: {
            username: "fajar",
            fullName: "Fajar",
            passwordHash
        }
    });

    logger.info("Seed success");

}

main()
.then(async()=>{
    await prisma.$disconnect();
})
.catch(async(e)=>{
    logger.error(e);
    await prisma.$disconnect();
    process.exit(1);

});