import { Prisma, PrismaClient } from "@prisma/client";

import { prisma } from "../../../config/prisma";

export class ProductReportRepository {

  async findByClientReportId(
    clientReportId: string
  ) {

    return prisma.productReport.findUnique({

      where: {
        clientReportId,
      },

    });

  }

  async createReport(
    tx: Prisma.TransactionClient,
    data: Prisma.ProductReportCreateInput
  ) {

    return tx.productReport.create({
      data,
    });

  }

  async createItems(
    tx: Prisma.TransactionClient,
    data: Prisma.ProductReportItemCreateManyInput[]
  ) {

    return tx.productReportItem.createMany({
      data,
    });

  }
}