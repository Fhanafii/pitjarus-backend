import { Router } from "express";
import { successResponse } from "../utils/response";
import authRoute from "../modules/auth/auth.route";

const router = Router();

router.use(authRoute);

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