import {getDb} from "../utils/db";
import CONSTANTS from "../utils/const";

const addEmployeeToDB = async (addressData, userData, employeeDetailsData) => {
  const result = await getDb()
    .transaction(function (trx) {
      return trx
        .insert(addressData, CONSTANTS.ADDRESS_TABLE.ID)
        .into(CONSTANTS.ADDRESS_TABLE.NAME)
        .then((result) => {
          userData.address = result[CONSTANTS.COMMON.ZERO_INDEX];
          return trx
            .insert(userData, CONSTANTS.USER_TABLE.ID)
            .into(CONSTANTS.USER_TABLE.NAME)
            .then((result) => {
              employeeDetailsData.id = result[CONSTANTS.COMMON.ZERO_INDEX];
              return trx
                .insert(employeeDetailsData, CONSTANTS.EMPLOYEE_DETAILS_TABLE.ID)
                .into(CONSTANTS.EMPLOYEE_DETAILS_TABLE.NAME)
            });
        });
    })

  return result[CONSTANTS.COMMON.ZERO_INDEX];
};

const getAllEmployees = async () => {
  return getDb()(CONSTANTS.EMPLOYEE_DETAILS_TABLE.NAME)
    .leftJoin(CONSTANTS.USER_TABLE.NAME, `${CONSTANTS.USER_TABLE.NAME}.${CONSTANTS.USER_TABLE.ID}`,
      `${CONSTANTS.EMPLOYEE_DETAILS_TABLE.NAME}.${CONSTANTS.EMPLOYEE_DETAILS_TABLE.ID}`)
    .leftJoin(CONSTANTS.ADDRESS_TABLE.NAME, `${CONSTANTS.ADDRESS_TABLE.NAME}.${CONSTANTS.ADDRESS_TABLE.ID}`,
      `${CONSTANTS.USER_TABLE.NAME}.${CONSTANTS.USER_TABLE.ADDRESS}`)
    .select(CONSTANTS.COMMON.SELECT_ALL);
}


export default {addEmployeeToDB, getAllEmployees};

