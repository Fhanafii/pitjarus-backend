import { Request, Response } from "express";
import { successResponse } from "../../../utils/response";
import { createProductReportSchema } from "./productReport.validation";
import { productReportService } from "./productReport.service";

export class ProductReportController {

  create = async (
    req: Request,
    res: Response
  ) => {

    const dto =
      createProductReportSchema.parse(
        req.body
      );

    const report =
      await productReportService.create(
        req.user.id,
        dto
      );

    return successResponse(
      res,
      {
        report_id: report.id,
      },
      "Product report berhasil disimpan",
      201
    );
  };
}

export const productReportController =
  new ProductReportController();