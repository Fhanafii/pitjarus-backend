import { Router } from "express";

import { authenticate } from "../../../middleware/auth.middleware";
import { asyncHandler } from "../../../utils/asyncHandler";

import { attendanceController } from "./attendance.controller";

const router = Router();

/**
 * POST /v1/report/attendance
 */
router.post(
  "/attendance",
  authenticate,
  asyncHandler(attendanceController.create)
);

export default router;