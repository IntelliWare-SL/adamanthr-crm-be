import Joi from "joi";
import userService from "../services/userService";
import CONSTANTS from "../utils/const";
import {errorHandler} from "../utils/commonErrorhandler";

const schema = Joi.object({
  role: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  contact_no: Joi.string().required(),
  is_phone_verified: Joi.boolean().required(),
  gender: Joi.string().required(),
  status: Joi.string().required().valid(CONSTANTS.USER_TABLE.STATUS_VALUES.ACTIVE,
    CONSTANTS.USER_TABLE.STATUS_VALUES.INACTIVE, CONSTANTS.USER_TABLE.STATUS_VALUES.DELETED),
  address: Joi.object({
    postal_code: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    country: Joi.string().required(),
  }),
});

const registerUser = async (req, res) => {
  const updatedSchema = schema.keys({password: Joi.string().required().min(6)})
  const validate = updatedSchema.validate(req.body, {abortEarly: false});
  if (validate.error) {
    res.status(400).send({message: validate.error.details[CONSTANTS.COMMON.ZERO_INDEX].message});
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

const loginUser = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(), password: Joi.string().required().min(6),
  });
  const validate = schema.validate(req.body, {abortEarly: false});
  if (validate.error) {
    res.status(400).send({message: validate.error.details[CONSTANTS.COMMON.ZERO_INDEX].message});
    return;
  }
  const body = validate.value;
  try {
    const result = await userService.login(body);
    res.status(201).send({accessToken: result});
  } catch (error) {
    errorHandler(error.message, res, error.code || CONSTANTS.ERROR_CODES.BAD_REQUEST)
  }
}

const updateUser = async (req, res) => {
  const updatedSchema = schema.keys({password: Joi.string().allow(null).required().min(6)});
  const validateId = Joi.object({id: Joi.string().required()}).validate(req.query, {abortEarly: false});
  if (validateId.error) {
    res.status(400).send({message: validateId.error.details[CONSTANTS.COMMON.ZERO_INDEX].message});
    return;
  }

  const validateData = updatedSchema.validate(req.body, {abortEarly: false});
  if (validateData.error) {
    res.status(400).send({message: validateData.error.details[CONSTANTS.COMMON.ZERO_INDEX].message});
    return;
  }
  const body = validateData.value;
  try {
    const result = await userService.updateUser(validateId.value.id, body);
    res.status(200).send(result);
  } catch (error) {
    errorHandler(error.message, res, error.code || CONSTANTS.ERROR_CODES.BAD_REQUEST)
  }
};

export default {registerUser, loginUser, updateUser};
