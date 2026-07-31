import { prisma } from "../../config/prisma";

export class StoreProductRepository {

  /**
   * Ambil seluruh produk milik store
   */
  async findByStoreId(storeId: number) {

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

  /**
   * Cek apakah relasi sudah ada
   */
  async exists(
    storeId: number,
    productId: number
  ) {

    return prisma.storeProduct.findFirst({

      where: {
        storeId,
        productId,
      },

    });

  }

  /**
   * Assign banyak product ke store
   */
  async createMany(
    storeId: number,
    productIds: number[]
  ) {

    return prisma.storeProduct.createMany({

      data: productIds.map(productId => ({
        storeId,
        productId,

      })),

      skipDuplicates: true,

    });

  }

  /**
   * Remove satu product dari store
   */
  async delete(
    storeId: number,
    productId: number
  ) {

    return prisma.storeProduct.deleteMany({

      where: {
        storeId,
        productId,
      },

    });
  }

  /**
   * Update promo product pada suatu store
   */
  async updatePromotion(
    storeId: number,
    productId: number,
    normalPrice: number,
    promoPrice: number
  ) {

    const result = await prisma.storeProduct.updateMany({
      where: {
        storeId,
        productId,
      },
      data: {
        normalPrice,
        promoPrice,
      },
    });

    await prisma.storeProduct.findMany({
      where: {
        storeId,
        productId,
      },
    });

    return result;
  }

  // Update Availability Product pada suatu store
  async updateAvailability(
    storeId: number,
    productId: number,
    available: boolean
  ) {
    return prisma.storeProduct.updateMany({
      where: {
        storeId,
        productId,
      },
      data: {
        available,
      },
    });
  }
}