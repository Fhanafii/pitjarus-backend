import { z } from "zod";

export const createProductSchema = z.object({
  barcode: z
    .string()
    .trim()
    .min(5, "Barcode wajib diisi")
    .max(50, "Barcode maksimal 50 karakter"),

  name: z
    .string()
    .trim()
    .min(3, "Nama produk minimal 3 karakter")
    .max(255, "Nama produk maksimal 255 karakter"),

  size: z
    .string()
    .trim()
    .min(1)
    .max(255),

  sku: z
    .string()
    .trim()
    .min(6, "Kode produk minimal 6 karakter")
    .max(12, "Kode produk maksimal 12 karakter"),
});

export const updateProductSchema = createProductSchema;

export const productIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const productQuerySchema = z.object({
  page: z.coerce.number().positive().optional(),

  limit: z.coerce.number().positive().optional(),

  search: z.string().optional(),
});