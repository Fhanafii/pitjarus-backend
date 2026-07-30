import { z } from "zod";

export const createProductReportSchema = z.object({
  client_report_id: z
    .string()
    .uuid("client_report_id harus berupa UUID"),

  store_id: z.coerce.number().int().positive(),

  timestamp: z
    .string()
    .refine(
      (value) => !isNaN(Date.parse(value)),
      {
        message: "Format timestamp tidak valid",
      }
    ),

  products: z
    .array(
      z.object({
        product_id: z.coerce.number().int().positive(),

        available: z.boolean(),
      })
    )
    .min(1, "Minimal satu produk harus dikirim"),
});