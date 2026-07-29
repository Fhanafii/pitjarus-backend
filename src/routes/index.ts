import { Router } from "express";
import { successResponse } from "../utils/response";
import authRoute from "../modules/auth/auth.route";
import storeRoutes from "../modules/stores/store.route";
import productRoutes from "../modules/products/product.route";

const router = Router();

router.use(authRoute);
router.use("/stores", storeRoutes);
router.use("/products", productRoutes);

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