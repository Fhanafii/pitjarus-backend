import { Router } from "express";

import { AuthController } from "./auth.controller";

const router = Router();

const controller = new AuthController();

/**
 * @openapi
 * /v1/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login User
 *     description: Login menggunakan username dan password untuk mendapatkan JWT Token.
 *     security: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: fajar
 *               password:
 *                 type: string
 *                 example: "44444"
 *
 *     responses:
 *       200:
 *         description: Login berhasil
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
 *                   example: Login berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Fajar
 *                     token:
 *                       type: string
 *                       description: JWT Access Token
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     expired_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-07-31T09:33:33.367Z"
 *
 *       400:
 *         description: Request tidak valid
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
 *                         example: username
 *                       message:
 *                         type: string
 *                         example: Username wajib diisi
 *
 *       401:
 *         description: Username atau password salah
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
 *                   example: Username atau password salah
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
router.post("/login", controller.login);

export default router;