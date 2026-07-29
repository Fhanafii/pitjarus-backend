import { Router } from "express";
import { successResponse } from "../utils/response";

const router = Router();

router.get("/health", (req, res) => {
  return successResponse(
    res,
    {
      timestamp: new Date(),
    },
    "API Running"
  );
});

export default router;