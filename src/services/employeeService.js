import employeeRepository from "../repositories/employeeRepository";

const addEmployeeDetails = async (data) => {
  return employeeRepository.addEmployeeDetailsToDB(data);
};

const getAllEmployees = async () => {
  const employees = await employeeRepository.getAllEmployees();
  if (employees != null) {
    return employees;
  }
};

export default {addEmployeeDetails, getAllEmployees};
