import { Request, Response } from "express";

import { successResponse } from "../../../utils/response";

import { createPromoReportSchema } from "./promo.validation";
import { promoService } from "./promo.service";

export class PromoController {

  /**
   * POST /v1/report/promo
   */
  create = async (
    req: Request,
    res: Response
  ) => {

    const dto =
      createPromoReportSchema.parse(req.body);

    const report =
      await promoService.create(
        req.user.id,
        dto

      );

    return successResponse(
      res,
      {
        promo_report_id: report.id,
      },
      "Promo report berhasil disimpan",
      201
    );
  };

}

export const promoController =
  new PromoController();