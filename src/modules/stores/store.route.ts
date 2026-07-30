import { Router } from "express";

import { storeController } from "./store.controller";

import { asyncHandler } from "../../utils/asyncHandler";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();


/**
 * POST /v1/stores
 */
/**
 * @openapi
 * /v1/stores:
 *   post:
 *     tags:
 *       - Stores
 *     summary: Create Store
 *     description: Membuat data toko baru.
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
 *               - code
 *               - name
 *               - address
 *             properties:
 *               code:
 *                 type: string
 *                 example: TJ022
 *               name:
 *                 type: string
 *                 example: TOKO KAMI
 *               address:
 *                 type: string
 *                 example: Jakarta
 *               latitude:
 *                 type: number
 *                 format: double
 *                 example: -6.201
 *               longitude:
 *                 type: number
 *                 format: double
 *                 example: 106.812
 *
 *     responses:
 *       201:
 *         description: Store berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Store berhasil dibuat
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     code:
 *                       type: string
 *                       example: TJ022
 *                     name:
 *                       type: string
 *                       example: TOKO KAMI
 *                     address:
 *                       type: string
 *                       example: Jakarta
 *                     latitude:
 *                       type: number
 *                       format: double
 *                       example: -6.201
 *                     longitude:
 *                       type: number
 *                       format: double
 *                       example: 106.812
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-30T15:56:04.297Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-30T15:56:04.297Z"
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
 *                         example: code
 *                       message:
 *                         type: string
 *                         example: Code wajib diisi
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
 *         description: Kode toko sudah digunakan
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
 *                   example: Kode toko sudah digunakan
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
  asyncHandler(storeController.create)
);

/**
  * POST /:id/products
  */
 /**
 * @openapi
 * /v1/stores/{id}/products:
 *   post:
 *     tags:
 *       - Stores
 *     summary: Assign Products to Store
 *     description: Menambahkan satu atau lebih produk ke dalam suatu toko.
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Store
 *         schema:
 *           type: integer
 *           example: 2
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_ids
 *             properties:
 *               product_ids:
 *                 type: array
 *                 description: Daftar ID produk yang akan ditambahkan ke toko.
 *                 items:
 *                   type: integer
 *                 example:
 *                   - 12
 *                   - 16
 *
 *     responses:
 *       200:
 *         description: Produk berhasil ditambahkan ke toko
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
 *                   example: Produk berhasil ditambahkan ke toko
 *
 *                 data:
 *                   nullable: true
 *                   example: null
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
 *                         example: product_ids
 *                       message:
 *                         type: string
 *                         example: product_ids minimal berisi satu produk
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
 *         description: Store tidak ditemukan
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
 *                   example: Store tidak ditemukan
 *
 *       409:
 *         description: Salah satu produk sudah terdaftar pada toko
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
 *                   example: Produk sudah terdaftar pada toko
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
  "/:id/products",
  authenticate,
  asyncHandler(
    storeController.assignProducts
  )
);

/**
 * GET /v1/stores
 */
/**
 * @openapi
 * /v1/stores:
 *   get:
 *     tags:
 *       - Stores
 *     summary: Get All Stores
 *     description: Mengambil daftar seluruh toko dengan dukungan pagination dan pencarian.
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Nomor halaman.
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Jumlah data per halaman.
 *
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Pencarian berdasarkan kode atau nama toko.
 *
 *     responses:
 *       200:
 *         description: Data store berhasil diambil
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
 *                   example: Data store berhasil diambil
 *
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *
 *                       code:
 *                         type: string
 *                         example: TJ001
 *
 *                       name:
 *                         type: string
 *                         example: TOKO INDOJUNI
 *
 *                       address:
 *                         type: string
 *                         example: Jakarta
 *
 *                       latitude:
 *                         type: number
 *                         format: double
 *                         example: -6.201
 *
 *                       longitude:
 *                         type: number
 *                         format: double
 *                         example: 106.812
 *
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-07-29T13:03:14.059Z"
 *
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-07-29T13:03:14.059Z"
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
 *
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
 *
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get(
  "/",
  authenticate,
  asyncHandler(storeController.findAll)
);

/**
  * GET /stores/:id/products
  */
/**
 * @openapi
 * /v1/stores/{id}/products:
 *   get:
 *     tags:
 *       - Stores
 *     summary: Get Product List by Store
 *     description: Mengambil seluruh produk yang dimiliki oleh suatu toko beserta status ketersediaan dan informasi promo.
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Store
 *         schema:
 *           type: integer
 *           example: 2
 *
 *     responses:
 *       200:
 *         description: Produk berhasil diambil
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
 *                   example: Produk berhasil diambil
 *
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 16
 *
 *                       barcode:
 *                         type: string
 *                         example: "8991678901"
 *
 *                       name:
 *                         type: string
 *                         example: Keripik Kentang ngawi
 *
 *                       sku:
 *                         type: string
 *                         example: SKU011
 *
 *                       size:
 *                         type: string
 *                         example: 250 Gram
 *
 *                       price:
 *                         type: integer
 *                         example: 1000
 *                         description: Harga master produk.
 *
 *                       available:
 *                         type: boolean
 *                         example: false
 *                         description: Status ketersediaan produk pada toko.
 *
 *                       normalPrice:
 *                         type: integer
 *                         nullable: true
 *                         example: 20000
 *                         description: Harga normal di toko sebelum promo.
 *
 *                       promoPrice:
 *                         type: integer
 *                         nullable: true
 *                         example: 1000
 *                         description: Harga promo produk di toko.
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
 *         description: Store tidak ditemukan
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
 *                   example: Store tidak ditemukan
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
    "/:id/products",
    authenticate,
    asyncHandler(
        storeController.getProducts
    )
);

/**
  * DELETE /:storeId/products/:productId
  */
 /**
 * @openapi
 * /v1/stores/{storeId}/products/{productId}:
 *   delete:
 *     tags:
 *       - Stores
 *     summary: Remove Product from Store
 *     description: Menghapus relasi antara store dan product. Produk tidak dihapus dari master product.
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         description: ID Store
 *         schema:
 *           type: integer
 *           example: 2
 *
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID Product
 *         schema:
 *           type: integer
 *           example: 16
 *
 *     responses:
 *       200:
 *         description: Produk berhasil dihapus dari toko
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
 *                   example: Produk berhasil dihapus dari toko
 *
 *                 data:
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
 *                   example: Produk tidak ditemukan pada toko
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
  "/:storeId/products/:productId",
  authenticate,
  asyncHandler(
    storeController.removeProduct
  )
);

/**
 * GET /v1/stores/:id
 */
/**
 * @openapi
 * /v1/stores/{id}:
 *   get:
 *     tags:
 *       - Stores
 *     summary: Get Store Detail with Product List
 *     description: Mengambil detail toko beserta daftar produk yang tersedia pada toko tersebut.
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Store
 *         schema:
 *           type: integer
 *           example: 2
 *
 *     responses:
 *       200:
 *         description: Detail store berhasil diambil
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
 *                   example: Detail store berhasil diambil
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *
 *                     code:
 *                       type: string
 *                       example: TJ001
 *
 *                     name:
 *                       type: string
 *                       example: TOKO INDOJUNI
 *
 *                     address:
 *                       type: string
 *                       example: Jakarta
 *
 *                     latitude:
 *                       type: number
 *                       format: double
 *                       example: -6.201
 *
 *                     longitude:
 *                       type: number
 *                       format: double
 *                       example: 106.812
 *
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-29T13:03:14.059Z"
 *
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-29T13:03:14.059Z"
 *
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *
 *                     products:
 *                       type: array
 *                       description: Daftar produk yang dimiliki oleh toko.
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 12
 *
 *                           barcode:
 *                             type: string
 *                             example: "89911827367890"
 *
 *                           name:
 *                             type: string
 *                             example: Keripik Kentang Xie-xie
 *
 *                           size:
 *                             type: string
 *                             example: 250 g
 *
 *                           sku:
 *                             type: string
 *                             example: SKU004
 *
 *                           available:
 *                             type: boolean
 *                             example: false
 *
 *                           normalPrice:
 *                             type: integer
 *                             nullable: true
 *                             example: 18000
 *
 *                           promoPrice:
 *                             type: integer
 *                             nullable: true
 *                             example: 1000
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
 *         description: Store tidak ditemukan
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
 *                   example: Store tidak ditemukan
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
  asyncHandler(storeController.findById)
);

/**
 * PUT /v1/stores/:id
 */
/**
 * @openapi
 * /v1/stores/{id}:
 *   put:
 *     tags:
 *       - Stores
 *     summary: Update Store
 *     description: Memperbarui informasi toko berdasarkan ID.
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Store
 *         schema:
 *           type: integer
 *           example: 4
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *               - address
 *             properties:
 *               code:
 *                 type: string
 *                 example: TJ021
 *               name:
 *                 type: string
 *                 example: TOKO INDOJUNI BARU
 *               address:
 *                 type: string
 *                 example: Bandung
 *               latitude:
 *                 type: number
 *                 format: double
 *                 example: -6.91
 *               longitude:
 *                 type: number
 *                 format: double
 *                 example: 107.61
 *
 *     responses:
 *       200:
 *         description: Store berhasil diperbarui
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
 *                   example: Store berhasil diperbarui
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 4
 *
 *                     code:
 *                       type: string
 *                       example: TJ021
 *
 *                     name:
 *                       type: string
 *                       example: TOKO INDOJUNI BARU
 *
 *                     address:
 *                       type: string
 *                       example: Bandung
 *
 *                     latitude:
 *                       type: number
 *                       format: double
 *                       example: -6.91
 *
 *                     longitude:
 *                       type: number
 *                       format: double
 *                       example: 107.61
 *
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-30T15:53:41.674Z"
 *
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-30T16:08:06.196Z"
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
 *                         example: name
 *                       message:
 *                         type: string
 *                         example: Nama toko wajib diisi
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
 *         description: Store tidak ditemukan
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
 *                   example: Store tidak ditemukan
 *
 *       409:
 *         description: Kode store sudah digunakan
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
 *                   example: Kode store sudah digunakan
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
  asyncHandler(storeController.update)
);

/**
 * DELETE /v1/stores/:id
 */
/**
 * @openapi
 * /v1/stores/{id}:
 *   delete:
 *     tags:
 *       - Stores
 *     summary: Delete Store
 *     description: Menghapus (soft delete) store berdasarkan ID.
 *
 *     security:
 *       - BearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID Store
 *         schema:
 *           type: integer
 *           example: 4
 *
 *     responses:
 *       200:
 *         description: Store berhasil dihapus
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
 *                   example: Store berhasil dihapus
 *
 *                 data:
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
 *         description: Store tidak ditemukan
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
 *                   example: Store tidak ditemukan
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
  asyncHandler(storeController.delete)
);

export default router;