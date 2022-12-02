import express from "express";
import userController from "../../controllers/userController";
import employeeController from "../../controllers/employeeController";
import checkToken from "../../middleware/checkAuth";
import isAdmin from "../../middleware/isAdmin";

const router = express.Router();

router.route("/registerUser").post(checkToken, isAdmin, userController.registerUser)
router.route("/login").post(userController.loginUser)
router.route("/addEmployeeDetails").post(checkToken, isAdmin, employeeController.addEmployeeDetails)
router.route("/getAllEmployees").get(checkToken, isAdmin, employeeController.getAllEmployees)
router.route("/updateUser").put(checkToken, isAdmin, userController.updateUser)
router.route("/updateEmployeeDetails").put(checkToken, isAdmin, employeeController.updateEmployeeDetails)

export default router;
