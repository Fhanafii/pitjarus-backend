import { z } from "zod";

export const createStoreSchema = z.object({
  code: z.string().min(1, "Kode toko wajib diisi"),
  name: z.string().min(3, "Nama toko minimal 3 karakter"),
  address: z.string().min(5, "Alamat minimal 5 karakter"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const updateStoreSchema = createStoreSchema;
export const storeIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const storeQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
});