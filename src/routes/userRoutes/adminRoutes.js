import express from "express";
import userController from "../../controllers/userController";
import checkToken from "../../middleware/checkAuth";
import isAdmin from "../../middleware/isAdmin";
const router = express.Router();

router.route("/registerEmployee").post(checkToken, isAdmin,userController.registerUser)
router.route("/login").post(userController.loginUser)

export default router;
