import { Router } from "express";
import { authenticate } from "../../../middleware/auth.middleware";
import { asyncHandler } from "../../../utils/asyncHandler";
import { productReportController } from "./productReport.controller";

const router = Router();

/**
 * POST /v1/report/product
 */
router.post(
  "/product",
  authenticate,
  asyncHandler(
    productReportController.create
  )
);

export default router;