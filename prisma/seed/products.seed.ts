import { PrismaClient } from "@prisma/client";

export async function seedProducts(prisma: PrismaClient) {

  const products = [
    {
      barcode: "8991234567890",
      name: "Keripik Kentang Xie-xie",
      size: "150 Gram",
      sku: "SKU001"
    },
    {
      barcode: "8991234567891",
      name: "Biskuit Kelapa Ni-hao",
      size: "250 Gram",
      sku: "SKU002"
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        barcode: product.barcode,
      },
      update: {},
      create: product,
    });
  }
}