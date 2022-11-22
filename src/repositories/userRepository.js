import {getDb} from "../utils/db";
import CONSTANTS from "../utils/const";

const addUserToDB = async (data) => {
   const result = await getDb()(CONSTANTS.USER_TABLE.NAME)
    .insert(data)
    .returning(CONSTANTS.USER_TABLE.ID);
  return result[CONSTANTS.COMMON.ZERO_INDEX];
};

const getUserByEmail = async (email) => {
  const result = await getDb()(CONSTANTS.USER_TABLE.NAME)
    .leftJoin(CONSTANTS.USER_ROLE_TABLE.NAME, `${CONSTANTS.USER_ROLE_TABLE.NAME}.${CONSTANTS.USER_ROLE_TABLE.ID}`,
      `${CONSTANTS.USER_TABLE.NAME}.${CONSTANTS.USER_TABLE.ROLE}`)
    .select(CONSTANTS.COMMON.SELECT_ALL)
    .where(CONSTANTS.USER_TABLE.EMAIL, email);
  return result[CONSTANTS.COMMON.ZERO_INDEX];
};

const getUserTypeIdByName = async (name) => {
  const result = await getDb()(CONSTANTS.USER_ROLE_TABLE.NAME)
    .select(CONSTANTS.USER_ROLE_TABLE.ID)
    .where(CONSTANTS.USER_ROLE_TABLE.ROLE, name);
  return result[CONSTANTS.COMMON.ZERO_INDEX][CONSTANTS.USER_ROLE_TABLE.ID];
};

export default { getUserByEmail, addUserToDB, getUserTypeIdByName };
