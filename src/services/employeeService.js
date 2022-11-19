import userRepository from "../repositories/userRepository";
import {newError} from "../utils/commonErrorhandler";
import CONSTANTS from "../utils/const";
import {genSaltSync, hashSync} from "bcrypt";
import employeeRepository from "../repositories/employeeRepository";

const addEmployee = async (data) => {
  const user = await userRepository.getUserByEmail(data.email);
  if (user) {
    newError(`User already exist for - ${data.email}`, CONSTANTS.ERROR_CODES.BAD_REQUEST)
  }

  const salt = genSaltSync(10);
  data.password = hashSync(data.password, salt);
  data.role = await userRepository.getUserTypeIdByName("employee");

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

  const employeeDetailsData = {
    date_of_join: data.date_of_join,
    employee_id: data.employee_id,
    adamant_code: data.adamant_code,
    dol: data.dol,
    designation: data.designation,
    supervisor: data.supervisor,
    job_location: data.job_location,
    job_location_state: data.job_location_state,
    on_roll: data.on_roll,
    dob: data.dob,
    emergency_no: data.emergency_no,
    self_aadhar_no: data.self_aadhar_no,
    qualification: data.qualification,
    father_name: data.father_name,
    mother_name: data.mother_name,
    spouse_name: data.spouse_name,
    esic_no: data.esic_no,
    uan: data.uan,
    pan_no: data.pan_no,
    account_no: data.account_no,
    ifsc_code: data.ifsc_code,
    bank_name: data.bank_name,
    permanent_address: data.permanent_address,
    correspondence_address: data.correspondence_address,
    daily_rate: data.daily_rate
  }

  return employeeRepository.addEmployeeToDB(addressData, userData, employeeDetailsData);
};

const getAllEmployees = async () => {
  const employees = await employeeRepository.getAllEmployees();
  if (employees != null) {
    return employees;
  }
};

export default {addEmployee, getAllEmployees};
