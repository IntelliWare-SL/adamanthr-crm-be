import {compareSync, genSaltSync, hashSync} from "bcrypt"
import {sign} from "jsonwebtoken";
import userRepository from "../repositories/userRepository";
import {newError} from "../utils/commonErrorhandler";
import CONSTANTS from "../utils/const";

const registerUser = async (data) => {
  const user = await userRepository.getUserByEmail(data.email);
  if (user) {
    newError(`User already exists for - ${data.email}`, CONSTANTS.ERROR_CODES.BAD_REQUEST)
  }

  const salt = genSaltSync(10);
  data.password = hashSync(data.password, salt);
  data.type = await userRepository.getUserTypeIdByName(data.type);

  if (!data.type) {
    newError(`User type is invalid. Please enter a valid user type`, CONSTANTS.ERROR_CODES.BAD_REQUEST)
  }

  const userData = {
    role: data.type,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: data.password,
    contact_no: data.contact_no,
    is_phone_verified: data.is_phone_verified,
    gender: data.gender,
    status: data.status,
  }

  const addressData = {
    postal_code: data.postal_code,
    city: data.city,
    street: data.street,
    country: data.country,
  }

  return userRepository.addUserToDB(userData, addressData);
};

const login = async(data) =>{
  const user = await userRepository.getUserByEmail(data.email);
  if (!user) {
    newError(`User does not exist for - ${data.email}`, CONSTANTS.ERROR_CODES.BAD_REQUEST)
  }

  const result = compareSync(
    data.password,
    user.password
  );

  if (result) {
    delete user.password;
    const jsontoken = sign({ result: user }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "1day",
    });
    return jsontoken
  }
  newError("Passwords does not match. Try Again", CONSTANTS.ERROR_CODES.UNAUTHORIZED)
}

export default {login, registerUser };
