import { Router } from "express";

import attendanceRoute from "./attendance/attendance.route";
import productReportRoute from "./product/productReport.route";
import promoReportRoute from "./promo/promo.route";

const router = Router();

router.use(attendanceRoute);
router.use(productReportRoute);

router.use(promoReportRoute);

export default router;