import express from "express";
import {testController} from "../controllers/userController";
const router = express.Router();

router.route("/test").get(testController);

export default router;
