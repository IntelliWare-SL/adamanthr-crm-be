import { getDb } from "../utils/db";
import CONSTANTS from "../utils/const";

const addUserToDB = async (data) => {
   const result = await getDb()(CONSTANTS.USER_TABLE.NAME)
    .insert(data)
    .returning(CONSTANTS.USER_TABLE.ID);
  return result[CONSTANTS.COMMON.ZERO_INDEX];
};

const getUserByEmail = async (email) => {
  const result = await getDb()(CONSTANTS.USER_TABLE.NAME)
      .leftJoin(CONSTANTS.ROLE_TABLE.NAME, `${CONSTANTS.ROLE_TABLE.NAME}.${CONSTANTS.ROLE_TABLE.ID}`,
        `${CONSTANTS.USER_TABLE.NAME}.${CONSTANTS.USER_TABLE.TYPE}`)
    .select(CONSTANTS.COMMON.SELECT_ALL)
    .where(CONSTANTS.USER_TABLE.EMAIL, email);
  return result[CONSTANTS.COMMON.ZERO_INDEX];
};

const getUserTypeIdByName = async (name) => {
  const result = await getDb()(CONSTANTS.ROLE_TABLE.NAME)
    .select(CONSTANTS.ROLE_TABLE.ID)
    .where(CONSTANTS.ROLE_TABLE.TYPE, name);
  return result[CONSTANTS.COMMON.ZERO_INDEX][CONSTANTS.ROLE_TABLE.ID];
};

export default { getUserByEmail, addUserToDB, getUserTypeIdByName };
