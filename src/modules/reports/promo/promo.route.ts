import { Router } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { authenticate } from "../../../middleware/auth.middleware";
import { promoController } from "./promo.controller";

const router = Router();

/**
 * POST /v1/report/promo
 */
/**
 * @openapi
 * /v1/report/promo:
 *   post:
 *     tags:
 *       - Reports
 *     summary: Submit Promo Report
 *     description: Mengirim laporan harga normal dan harga promo produk pada suatu toko.
 *
 *     security:
 *       - BearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - client_report_id
 *               - store_id
 *               - promo
 *               - timestamp
 *             properties:
 *
 *               client_report_id:
 *                 type: string
 *                 format: uuid
 *                 example: "8d4d6d9c-cc7f-469e-9b65-5a83aaa1441d"
 *
 *               store_id:
 *                 type: integer
 *                 example: 2
 *
 *               promo:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_name
 *                     - normal_price
 *                     - promo_price
 *                   properties:
 *
 *                     product_name:
 *                       type: string
 *                       example: Keripik Kentang Xie-xie
 *
 *                     normal_price:
 *                       type: integer
 *                       example: 18000
 *
 *                     promo_price:
 *                       type: integer
 *                       example: 1000
 *
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-07-30T09:30:10+07:00"
 *
 *     responses:
 *       201:
 *         description: Promo report berhasil disimpan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Promo report berhasil disimpan
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     promo_report_id:
 *                       type: integer
 *                       example: 7
 *
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 message:
 *                   type: string
 *                   example: Validation Error
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *
 *       404:
 *         description: Store atau Product tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 message:
 *                   type: string
 *                   example: Store atau Product tidak ditemukan
 *
 *       409:
 *         description: Client Report ID sudah digunakan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 message:
 *                   type: string
 *                   example: Client Report ID sudah digunakan
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post(
  "/promo",
  authenticate,
  asyncHandler(
    promoController.create
  )
);

export default router;