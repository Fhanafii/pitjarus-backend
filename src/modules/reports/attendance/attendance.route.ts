import { Router } from "express";

import { authenticate } from "../../../middleware/auth.middleware";
import { asyncHandler } from "../../../utils/asyncHandler";

import { attendanceController } from "./attendance.controller";

const router = Router();

/**
 * POST /v1/report/attendance
 */
/**
 * @openapi
 * /v1/report/attendance:
 *   post:
 *     tags:
 *       - Reports
 *     summary: Submit Attendance Report
 *     description: Mengirim laporan absensi (Check In / Check Out) beserta lokasi dan foto ke server.
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
 *               - attendance_type
 *               - timestamp
 *               - location
 *               - photo
 *             properties:
 *
 *               client_report_id:
 *                 type: string
 *                 format: uuid
 *                 example: "0f3cde89-91da-4e2f-8ef8-daf5f7d20a74"
 *
 *               attendance_type:
 *                 type: string
 *                 enum:
 *                   - check_in
 *                   - check_out
 *                 example: check_in
 *
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-07-30T08:03:22+07:00"
 *
 *               location:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     format: double
 *                     example: -6.234211
 *
 *                   longitude:
 *                     type: number
 *                     format: double
 *                     example: 106.813920
 *
 *                   accuracy:
 *                     type: number
 *                     format: double
 *                     example: 8.4
 *
 *               photo:
 *                 type: object
 *                 properties:
 *                   file_name:
 *                     type: string
 *                     example: attendance.jpg
 *
 *                   mime_type:
 *                     type: string
 *                     example: image/jpeg
 *
 *                   base64:
 *                     type: string
 *                     description: Foto dalam format Base64
 *                     example: "/9j/4AAQSkZJRgABAQAAAQABAAD"
 *
 *     responses:
 *       201:
 *         description: Attendance berhasil dikirim
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
 *                   example: Attendance berhasil dikirim
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     attendance_id:
 *                       type: integer
 *                       example: 1
 *
 *                     client_report_id:
 *                       type: string
 *                       format: uuid
 *                       example: "0f3cde89-91da-4e2f-8ef8-daf5f7d20a74"
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
 *       409:
 *         description: Client Report ID sudah pernah digunakan
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
  "/attendance",
  authenticate,
  asyncHandler(attendanceController.create)
);

export default router;