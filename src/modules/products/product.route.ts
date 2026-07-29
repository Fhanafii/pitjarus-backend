import { Router } from "express";

import { productController } from "./product.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

/**
 * POST /v1/products
 */
router.post(
  "/",
  authenticate,
  asyncHandler(productController.create)
);

/**
 * GET /v1/products
 */
router.get(
  "/",
  authenticate,
  asyncHandler(productController.findAll)
);

/**
 * GET /v1/products/:id
 */
router.get(
  "/:id",
  authenticate,
  asyncHandler(productController.findById)
);

/**
 * PUT /v1/products/:id
 */
router.put(
  "/:id",
  authenticate,
  asyncHandler(productController.update)
);

/**
 * DELETE /v1/products/:id
 */
router.delete(
  "/:id",
  authenticate,
  asyncHandler(productController.delete)
);

export default router;