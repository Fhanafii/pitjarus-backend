import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";

export class StoreRepository {
  async create(data: Prisma.StoreCreateInput) {
    return prisma.store.create({
      data,
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
                    code: {
                    contains: search,
                    mode: "insensitive" as const,
                    },
                },
                {
                    name: {
                    contains: search,
                    mode: "insensitive" as const,
                    },
                },
                ],
            }),
        };

        const [stores, total] = await prisma.$transaction([

            prisma.store.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    id: "asc",
                },
            }),

            prisma.store.count({
                where,
            }),
        ]);

        return {
            stores,
            total,
        };
    }

  async findById(id: number) {
    return prisma.store.findFirst({
      where: {
        id,
        isActive:true
      },
    });
  }

  async findByCode(code: string) {
    return prisma.store.findFirst({
      where: {
        code,
        isActive:true
      },
    });
  }

  async update(id: number, data: Prisma.StoreUpdateInput) {
    return prisma.store.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.store.update({
        where:{
            id
        },
        data:{
            isActive:false
        }
    })
  }

  /**
   * GET /stores/:id/products
   */
  async findByStoreId(
      storeId: number
  ) {
       return prisma.storeProduct.findMany({
        where: {
          storeId,
        },
        include: {
          product: true,
        },
        orderBy: {
            product: {
              name: "asc",
            },
        },
    });
  }

  async findDetail(id:number){
    return prisma.store.findFirst({
        where:{
            id,
            isActive:true,
        },

        include:{
            storeProducts:{
                include:{
                    product:true,
                },

            },

        },

    });
  }
}