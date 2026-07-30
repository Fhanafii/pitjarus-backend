import { PrismaClient } from "@prisma/client";

export async function seedStores(prisma: PrismaClient) {

  const stores = [
    {
      code: "TJ001",
      name: "TOKO INDOJUNI",
      address: "Jakarta",
      latitude: -6.201,
      longitude: 106.812
    },
    {
      code: "TJ002",
      name: "TOKO MAJU JAYA",
      address: "Bekasi",
      latitude: -6.201,
      longitude: 106.812
    },
  ];

  for (const store of stores) {
    await prisma.store.upsert({
      where: {
        code: store.code,
      },
      update: {},
      create: store,
    });
  }
}