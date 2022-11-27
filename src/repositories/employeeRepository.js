import {getDb} from "../utils/db";
import CONSTANTS from "../utils/const";

const addEmployeeDetailsToDB = async (data) => {
  // const user = await userRepository.getUserByEmail(data.email);
  // if (!user) {
  //   newError(`User does not exist for - ${data.email}`, CONSTANTS.ERROR_CODES.BAD_REQUEST)
  // }

  const result = await getDb()(CONSTANTS.EMPLOYEE_DETAILS_TABLE.NAME)
    .insert(data)
    .returning(CONSTANTS.EMPLOYEE_DETAILS_TABLE.ID);

  return result[CONSTANTS.COMMON.ZERO_INDEX];
};

const getAllEmployees = async () => {
  return getDb()(CONSTANTS.USER_TABLE.NAME)
    .rightJoin(CONSTANTS.EMPLOYEE_DETAILS_TABLE.NAME, `${CONSTANTS.USER_TABLE.NAME}.${CONSTANTS.USER_TABLE.ID}`,
      `${CONSTANTS.EMPLOYEE_DETAILS_TABLE.NAME}.${CONSTANTS.EMPLOYEE_DETAILS_TABLE.ID}`)
    .leftJoin(CONSTANTS.USER_ROLE_TABLE.NAME, `${CONSTANTS.USER_TABLE.NAME}.${CONSTANTS.USER_TABLE.ROLE}`,
      `${CONSTANTS.USER_ROLE_TABLE.NAME}.${CONSTANTS.USER_ROLE_TABLE.ID}`)
    .leftJoin(CONSTANTS.ADDRESS_TABLE.NAME, `${CONSTANTS.USER_TABLE.NAME}.${CONSTANTS.USER_TABLE.ADDRESS}`,
      `${CONSTANTS.ADDRESS_TABLE.NAME}.${CONSTANTS.ADDRESS_TABLE.ID}`)
    .select(CONSTANTS.COMMON.SELECT_ALL);
}

export default {addEmployeeDetailsToDB, getAllEmployees};

