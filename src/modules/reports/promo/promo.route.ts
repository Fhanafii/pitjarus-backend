import { Router } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { authenticate } from "../../../middleware/auth.middleware";
import { promoController } from "./promo.controller";

const router = Router();

/**
 * POST /v1/report/promo
 */
router.post(
  "/promo",
  authenticate,
  asyncHandler(
    promoController.create
  )
);

export default router;