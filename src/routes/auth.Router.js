import express from "express";
const router = express.Router();

router.route("/test").get(testController);

export default router;
