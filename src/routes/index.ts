import { Router } from "express";
import { successResponse } from "../utils/response";
import authRoute from "../modules/auth/auth.route";
import storeRoutes from "../modules/stores/store.route";
import productRoutes from "../modules/products/product.route";
import reportRoutes from "../modules/reports/report.route";

const router = Router();

router.use(authRoute);
router.use("/stores", storeRoutes);
router.use("/products", productRoutes);
router.use("/report", reportRoutes);

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