import { Router } from "express";

import { storeController } from "./store.controller";

import { asyncHandler } from "../../utils/asyncHandler";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

/**
 * POST /v1/stores
 */
router.post(
  "/",
  authenticate,
  asyncHandler(storeController.create)
);

/**
 * GET /v1/stores
 */
router.get(
  "/",
  authenticate,
  asyncHandler(storeController.findAll)
);

/**
  * GET /stores/:id/products
  */
router.get(
    "/:id/products",
    authenticate,
    asyncHandler(
        storeController.getProducts
    )
);

/**
 * GET /v1/stores/:id
 */
router.get(
  "/:id",
  authenticate,
  asyncHandler(storeController.findById)
);

/**
 * PUT /v1/stores/:id
 */
router.put(
  "/:id",
  authenticate,
  asyncHandler(storeController.update)
);

/**
 * DELETE /v1/stores/:id
 */
router.delete(
  "/:id",
  authenticate,
  asyncHandler(storeController.delete)
);

export default router;