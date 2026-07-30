import { z } from "zod";

export const createPromoReportSchema = z.object({

  client_report_id: z
    .string()
    .uuid(),

  store_id: z
    .coerce
    .number()
    .int()
    .positive(),

  timestamp: z
    .string()
    .datetime({ offset: true }),

  promo: z.array(

    z.object({

      product_name: z
        .string()
        .min(1),

      normal_price: z
        .coerce
        .number()
        .int()
        .positive(),

      promo_price: z
        .coerce
        .number()
        .int()
        .positive(),
    })
  ).min(1),

});