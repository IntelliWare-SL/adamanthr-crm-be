import express from "express";
import userController from "../../controllers/userController";
const router = express.Router();

router.route("/registerEmployee").post(userController.registerUser)
router.route("/login").post(userController.loginUser)

export default router;
