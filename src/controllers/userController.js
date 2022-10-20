import Joi from "joi";
import userService from "../services/userService";
import CONSTANTS from "../utils/const";
import { errorHandler } from "../utils/commonErrorhandler";


const registerUser = async (req, res) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    type: Joi.string().required(),
    password: Joi.string().required().min(6),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const validate = schema.validate(req.body, { abortEarly: false });
  if (validate.error) {
    res.status(400).send({ message: validate.error.details[CONSTANTS.COMMON.ZERO_INDEX].message });
    return;
  }
  const body = validate.value;
  try {
    const result = await userService.registerUser(body);
    res.status(201).send(result);
  } catch (error) {
    errorHandler(error.message, res, error.code || CONSTANTS.ERROR_CODES.BAD_REQUEST)
  }
};

const loginUser = async (req,res) =>{
  const schema = Joi.object({
    password: Joi.string().required().min(6),
    email: Joi.string().email().required(),
  });
  const validate = schema.validate(req.body, { abortEarly: false });
  if (validate.error) {
    res.status(400).send({ message: validate.error.details[CONSTANTS.COMMON.ZERO_INDEX].message });
    return;
  }
  const body = validate.value;
  try {
    const result = await userService.login(body);
    res.status(201).send(result);
  } catch (error) {
    errorHandler(error.message, res, error.code || CONSTANTS.ERROR_CODES.BAD_REQUEST)
  }
}

export default { registerUser, loginUser };
