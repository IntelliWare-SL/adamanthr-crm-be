import CONSTANTS from "../utils/const";
import { errorHandler } from "../utils/commonErrorhandler";

const isEmployee = (req, res, next) => {
  if (req.user.type !== CONSTANTS.ROLE_TABLE.values.EMPLOYEE){
    errorHandler("Not authorized", res, CONSTANTS.ERROR_CODES.UNAUTHORIZED)
  }
  else{
    next()
  }

};

export default isEmployee;