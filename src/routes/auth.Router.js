import express from "express";
import adminRoutes from "./userRoutes/adminRoutes";

const router = express.Router();

router.use("/admin", adminRoutes)

export default router;
