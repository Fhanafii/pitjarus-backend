import { Router } from "express";
import { authenticate } from "../../../middleware/auth.middleware";
import { asyncHandler } from "../../../utils/asyncHandler";
import { productReportController } from "./productReport.controller";

const router = Router();

/**
 * POST /v1/report/product
 */
/**
 * @openapi
 * /v1/report/product:
 *   post:
 *     tags:
 *       - Reports
 *     summary: Submit Product Report
 *     description: Mengirim laporan ketersediaan produk pada suatu toko.
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
 *               - products
 *               - timestamp
 *             properties:
 *
 *               client_report_id:
 *                 type: string
 *                 format: uuid
 *                 example: "8d4d6d9c-cc7f-469e-9b65-5a83d3d7701d"
 *
 *               store_id:
 *                 type: integer
 *                 example: 2
 *
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_id
 *                     - available
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       example: 2
 *
 *                     available:
 *                       type: boolean
 *                       example: true
 *
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-07-30T09:12:00+07:00"
 *
 *     responses:
 *       201:
 *         description: Product report berhasil disimpan
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
 *                   example: Product report berhasil disimpan
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     report_id:
 *                       type: integer
 *                       example: 1
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
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post(
  "/product",
  authenticate,
  asyncHandler(
    productReportController.create
  )
);

export default router;