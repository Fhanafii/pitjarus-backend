import { Router } from "express";

import { productController } from "./product.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

/**
 * POST /v1/products
 */
/**
 * @openapi
 * /v1/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create Product
 *     description: Menambahkan produk baru ke master product.
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
 *               - barcode
 *               - name
 *               - size
 *               - sku
 *               - price
 *             properties:
 *               barcode:
 *                 type: string
 *                 example: "8991678901"
 *
 *               name:
 *                 type: string
 *                 example: Keripik Kentang Xie-xie
 *
 *               size:
 *                 type: string
 *                 example: 250 g
 *
 *               sku:
 *                 type: string
 *                 example: SKU003
 *
 *               price:
 *                 type: integer
 *                 example: 15000
 *
 *     responses:
 *       201:
 *         description: Produk berhasil dibuat
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
 *                   example: Produk berhasil dibuat
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 16
 *
 *                     barcode:
 *                       type: string
 *                       example: "8991678901"
 *
 *                     name:
 *                       type: string
 *                       example: Keripik Kentang Xie-xie
 *
 *                     size:
 *                       type: string
 *                       example: 250 g
 *
 *                     sku:
 *                       type: string
 *                       example: SKU003
 *
 *                     price:
 *                       type: integer
 *                       example: 15000
 *
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-30T14:08:15.226Z"
 *
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-30T14:08:15.226Z"
 *
 *                     isActive:
 *                       type: boolean
 *                       example: true
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
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: barcode
 *                       message:
 *                         type: string
 *                         example: Barcode wajib diisi
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
 *       409:
 *         description: Barcode atau SKU sudah digunakan
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
 *                   example: Barcode produk sudah digunakan
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
  "/",
  authenticate,
  asyncHandler(productController.create)
);

/**
 * GET /v1/products
 */
/**
 * @openapi
 * /v1/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get All Products
 *     description: Mengambil daftar seluruh master produk dengan dukungan pagination dan pencarian.
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Nomor halaman
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 1
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Jumlah data per halaman
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 10
 *
 *       - in: query
 *         name: search
 *         required: false
 *         description: Pencarian berdasarkan barcode atau nama produk
 *         schema:
 *           type: string
 *           example: Keripik
 *
 *     responses:
 *       200:
 *         description: Data produk berhasil diambil
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
 *                   example: Data produk berhasil diambil
 *
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 12
 *
 *                       barcode:
 *                         type: string
 *                         example: "89911827367890"
 *
 *                       name:
 *                         type: string
 *                         example: Keripik Kentang Xie-xie
 *
 *                       size:
 *                         type: string
 *                         example: 250 g
 *
 *                       sku:
 *                         type: string
 *                         example: SKU004
 *
 *                       price:
 *                         type: integer
 *                         example: 15000
 *
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-07-30T14:06:27.025Z"
 *
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-07-30T14:06:27.025Z"
 *
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *
 *                     limit:
 *                       type: integer
 *                       example: 10
 *
 *                     total:
 *                       type: integer
 *                       example: 2
 *
 *                     totalPages:
 *                       type: integer
 *                       example: 1
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
router.get(
  "/",
  authenticate,
  asyncHandler(productController.findAll)
);

/**
 * GET /v1/products/:id
 */
/**
 * @openapi
 * /v1/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get Product Detail
 *     description: Mengambil detail produk berdasarkan ID.
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Product
 *         schema:
 *           type: integer
 *           example: 16
 *
 *     responses:
 *       200:
 *         description: Detail produk berhasil diambil
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
 *                   example: Detail produk berhasil diambil
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 16
 *
 *                     barcode:
 *                       type: string
 *                       example: "8991678901"
 *
 *                     name:
 *                       type: string
 *                       example: Keripik Kentang ngawi
 *
 *                     size:
 *                       type: string
 *                       example: 250 Gram
 *
 *                     sku:
 *                       type: string
 *                       example: SKU011
 *
 *                     price:
 *                       type: integer
 *                       example: 1000
 *
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-30T14:08:15.226Z"
 *
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-30T14:10:34.773Z"
 *
 *                     isActive:
 *                       type: boolean
 *                       example: true
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
 *         description: Produk tidak ditemukan
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
 *                   example: Produk tidak ditemukan
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
router.get(
  "/:id",
  authenticate,
  asyncHandler(productController.findById)
);

/**
 * PUT /v1/products/:id
 */
/**
 * @openapi
 * /v1/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update Product
 *     description: Memperbarui data master produk berdasarkan ID.
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Product
 *         schema:
 *           type: integer
 *           example: 16
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - barcode
 *               - name
 *               - size
 *               - sku
 *               - price
 *             properties:
 *               barcode:
 *                 type: string
 *                 example: "8991678901"
 *
 *               name:
 *                 type: string
 *                 example: Keripik Kentang ngawi
 *
 *               size:
 *                 type: string
 *                 example: 250 Gram
 *
 *               sku:
 *                 type: string
 *                 example: SKU011
 *
 *               price:
 *                 type: integer
 *                 example: 1000
 *
 *     responses:
 *       200:
 *         description: Produk berhasil diperbarui
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
 *                   example: Produk berhasil diperbarui
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 16
 *
 *                     barcode:
 *                       type: string
 *                       example: "8991678901"
 *
 *                     name:
 *                       type: string
 *                       example: Keripik Kentang ngawi
 *
 *                     size:
 *                       type: string
 *                       example: 250 Gram
 *
 *                     sku:
 *                       type: string
 *                       example: SKU011
 *
 *                     price:
 *                       type: integer
 *                       example: 1000
 *
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-30T14:08:15.226Z"
 *
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-30T14:10:34.773Z"
 *
 *                     isActive:
 *                       type: boolean
 *                       example: true
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
 *         description: Produk tidak ditemukan
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
 *                   example: Produk tidak ditemukan
 *
 *       409:
 *         description: Barcode sudah digunakan
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
 *                   example: Barcode produk sudah digunakan
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
router.put(
  "/:id",
  authenticate,
  asyncHandler(productController.update)
);

/**
 * DELETE /v1/products/:id
 */
/**
 * @openapi
 * /v1/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete Product
 *     description: Menghapus (soft delete) master produk berdasarkan ID.
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Product
 *         schema:
 *           type: integer
 *           example: 16
 *
 *     responses:
 *       200:
 *         description: Produk berhasil dihapus
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
 *                   example: Produk berhasil dihapus
 *
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
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
 *         description: Produk tidak ditemukan
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
 *                   example: Produk tidak ditemukan
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
router.delete(
  "/:id",
  authenticate,
  asyncHandler(productController.delete)
);

export default router;