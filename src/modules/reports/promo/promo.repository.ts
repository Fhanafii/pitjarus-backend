import { Prisma } from "@prisma/client";
import { prisma } from "../../../config/prisma";

export class PromoRepository {

  async create(
    data: Prisma.PromoReportCreateInput
  ) {

    return prisma.promoReport.create({
      data,
      include: {
        items: true,
      },
    });
  }

  async createReport(
    tx: Prisma.TransactionClient,
    data: Prisma.PromoReportCreateInput
    ) {
    return tx.promoReport.create({
        data,
    });
  }

  async createItem(
    tx: Prisma.TransactionClient,
    data: Prisma.PromoReportItemUncheckedCreateInput
    ) {
    return tx.promoReportItem.create({
        data,
    });
  }
  
}