import express from "express";
import adminRoutes from "./userRoutes/adminRoutes";
import employeeRoutes from "./userRoutes/employeeRoutes";
const router = express.Router();

router.use("/admin", adminRoutes)
router.use("/employee", employeeRoutes)

export default router;
