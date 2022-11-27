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
  data.role = await userRepository.getUserTypeIdByName(data.role);

  if (!data.role) {
    newError(`User type is invalid. Please enter a valid user type`, CONSTANTS.ERROR_CODES.BAD_REQUEST)
  }

  const addressData = data.address;
  delete data.address;
  return userRepository.addUserToDB(data, addressData);
};

const login = async (data) => {
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
    const jsontoken = sign({result: user}, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "1day",
    });
    return jsontoken
  }
  newError("Passwords does not match. Try Again", CONSTANTS.ERROR_CODES.UNAUTHORIZED)
}

export default {login, registerUser};
