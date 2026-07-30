import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";

export class ProductRepository {

  async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
    });
  }

  async findById(id: number) {
    return prisma.product.findFirst({
      where: {
        id,
        isActive: true,
      },
    });
  }

  async findByBarcode(barcode: string) {
    return prisma.product.findFirst({
      where: {
        barcode,
        isActive: true,
      },
    });
  }

  async findAll(
    page: number,
    limit: number,
    search?: string
  ) {

    const where = {
        isActive: true,
        ...(search && {
            OR: [
                {
                    barcode: {
                        contains: search,
                        mode: Prisma.QueryMode.insensitive,
                    },
                },
                {
                    name: {
                        contains: search,
                        mode: Prisma.QueryMode.insensitive,
                    },
                },
            ],
        }),
    };
    const [products, total] =
      await prisma.$transaction([

        prisma.product.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            id: "asc",
          },
        }),

        prisma.product.count({
          where,
        }),
      ]);

    return {
      products,
      total,
    };
  }

  async update(
    id: number,
    data: Prisma.ProductUpdateInput
  ) {

    return prisma.product.update({

      where: {
        id,
      },

      data,
    });
  }

  async delete(id: number) {
    return prisma.product.update({
        where: {
            id,
        },
        data: {
            isActive: false,
        },
    });
 }

 async findManyByIds(ids: number[]) {
    return prisma.product.findMany({

      where:{
        id:{
          in: ids,
        },
        isActive:true,
      },
    });
  }

  /**
   * Cari product berdasarkan nama
   */
  async findByName(name: string) {

    return prisma.product.findFirst({

      where: {
        name: {
          equals: name,
          mode: Prisma.QueryMode.insensitive,
        },
        isActive: true,
      },
    });
  }
  
}