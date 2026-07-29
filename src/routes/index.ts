import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "API Running",
        timestamp: new Date(),
    });
});

export default router;