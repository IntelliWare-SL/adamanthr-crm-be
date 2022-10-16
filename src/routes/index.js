import express from "express";
import authRouter from "./auth.Router";
const router = express.Router();

router.use("/users", authRouter);

export default router;
