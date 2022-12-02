import {getDb} from "../utils/db";
import CONSTANTS from "../utils/const";

const addUserToDB = async (userData, addressData) => {
  const result = await getDb()
    .transaction(function (trx) {
      return trx
        .insert(addressData, CONSTANTS.ADDRESS_TABLE.ID)
        .into(CONSTANTS.ADDRESS_TABLE.NAME)
        .then((result) => {
          userData.address = result[CONSTANTS.COMMON.ZERO_INDEX][CONSTANTS.ADDRESS_TABLE.ID];
          return trx
            .insert(userData, CONSTANTS.USER_TABLE.ID)
            .into(CONSTANTS.USER_TABLE.NAME)
        });
    });

  return result[CONSTANTS.COMMON.ZERO_INDEX];
};

const getUserByEmail = async (email) => {
  const result = await getDb()(CONSTANTS.USER_TABLE.NAME)
    .leftJoin(CONSTANTS.USER_ROLE_TABLE.NAME, `${CONSTANTS.USER_ROLE_TABLE.NAME}.${CONSTANTS.USER_ROLE_TABLE.ID}`,
      `${CONSTANTS.USER_TABLE.NAME}.${CONSTANTS.USER_TABLE.ROLE}`)
    .select(`${CONSTANTS.USER_TABLE.NAME}.${CONSTANTS.USER_TABLE.ID}`,
      CONSTANTS.USER_TABLE.FIRST_NAME,
      CONSTANTS.USER_TABLE.LAST_NAME,
      `${CONSTANTS.USER_ROLE_TABLE.NAME}.${CONSTANTS.USER_TABLE.ROLE}`,
      CONSTANTS.USER_TABLE.EMAIL,
      CONSTANTS.USER_TABLE.PASSWORD,
      CONSTANTS.USER_TABLE.CONTACT_NO,
      CONSTANTS.USER_TABLE.IS_PHONE_VERIFIED,
      CONSTANTS.USER_TABLE.GENDER,
      CONSTANTS.USER_TABLE.STATUS)
    .where(CONSTANTS.USER_TABLE.EMAIL, email);
  return result[CONSTANTS.COMMON.ZERO_INDEX];
};

const getUserIdByEmail = async (email) => {
  const result = await getDb()(CONSTANTS.USER_TABLE.NAME)
    .select(CONSTANTS.USER_TABLE.ID)
    .where(CONSTANTS.USER_TABLE.EMAIL, email);
  return result[CONSTANTS.COMMON.ZERO_INDEX];
};

const getUserTypeIdByName = async (name) => {
  const result = await getDb()(CONSTANTS.USER_ROLE_TABLE.NAME)
    .select(CONSTANTS.USER_ROLE_TABLE.ID)
    .where(CONSTANTS.USER_ROLE_TABLE.ROLE, name);
  return result[CONSTANTS.COMMON.ZERO_INDEX][CONSTANTS.USER_ROLE_TABLE.ID];
};

const updateUserInDB = async (id, userData, addressData) => {
  const result1 = await getDb()(CONSTANTS.USER_TABLE.NAME)
    .update(userData, CONSTANTS.USER_TABLE.ADDRESS)
    .where(CONSTANTS.USER_TABLE.ID, id);

  const result2 = await getDb()(CONSTANTS.ADDRESS_TABLE.NAME)
    .update(addressData)
    .where(CONSTANTS.ADDRESS_TABLE.ID, result1[CONSTANTS.COMMON.ZERO_INDEX][CONSTANTS.USER_TABLE.ADDRESS]);


  return {id: id};
};

export default {getUserByEmail, getUserIdByEmail, addUserToDB, getUserTypeIdByName, updateUserInDB};
