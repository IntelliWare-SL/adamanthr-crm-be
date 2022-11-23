import Joi from "joi";
import CONSTANTS from "../utils/const";
import employeeService from "../services/employeeService";
import {errorHandler} from "../utils/commonErrorhandler";

const addEmployeeDetails = async (req, res) => {
  const schema = Joi.object({
    id: Joi.uid().required(),
    date_of_join: Joi.date().required(),
    employee_id: Joi.string().required(),
    adamant_code: Joi.string().required(),
    dol: Joi.date(),
    designation: Joi.string().required(),
    supervisor: Joi.uid().required(),
    job_location: Joi.string().required(),
    job_location_state: Joi.string().required(),
    on_roll: Joi.string(),
    dob: Joi.date().required(),
    emergency_no: Joi.string().required(),
    self_aadhar_no: Joi.string().required(),
    qualification: Joi.string().required(),
    father_name: Joi.string().required(),
    mother_name: Joi.string().required(),
    spouse_name: Joi.string().required(),
    esic_no: Joi.string().required(),
    uan: Joi.string().required(),
    pan_no: Joi.string().required(),
    account_no: Joi.string().required(),
    ifsc_code: Joi.string(),
    bank_name: Joi.string(),
    permanent_address: Joi.string().required(),
    correspondence_address: Joi.string().required(),
    daily_rate: Joi.number().required(),
  });
  const validate = schema.validate(req.body, {abortEarly: false});
  if (validate.error) {
    res.status(CONSTANTS.ERROR_CODES.BAD_REQUEST).send({message: validate.error.details[CONSTANTS.COMMON.ZERO_INDEX].message});
    return;
  }
  const body = validate.value;
  try {
    const result = await employeeService.addEmployeeDetails(body);
    res.status(201).send(result);
  } catch (error) {
    errorHandler(error.message, res, error.code || CONSTANTS.ERROR_CODES.BAD_REQUEST)
  }
}

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).send({data: employees});
  } catch (error) {
    errorHandler(error.message, res, error.code || CONSTANTS.ERROR_CODES.BAD_REQUEST);
  }
};

export default {addEmployeeDetails, getAllEmployees};
