const schema = "public"

export default {
  USER_TABLE: {
    NAME: `user`,
    ID: "id",
    FIRST_NAME: "first_name",
    LAST_NAME: "last_name",
    ROLE: "role",
    EMAIL: "email",
    PASSWORD: "password",
    CONTACT_NO: "contact_no",
    IS_PHONE_VERIFIED: "is_phone_verified",
    GENDER: "gender",
    STATUS: "status",
    STATUS_VALUES: {
      ACTIVE: "active",
      INACTIVE: "inactive",
      DELETED: "deleted",
    },
    ADDRESS: "address",
    CREATED_AT: "created_at",
    UPDATED_AT: "updated_at",
  },
  USER_ROLE_TABLE: {
    NAME: `user_role`,
    ID: "id",
    ROLE: "role",
    ROLE_VALUES: {
      ADMIN: "admin",
      EMPLOYEE: "employee",
    },
  },
  ADDRESS_TABLE: {
    NAME: `address`,
    ID: "id",
    POSTAL_CODE: "postal_code",
    CITY: "city",
    STREET: "street",
    COUNTRY: "country",
  },
  EMPLOYEE_DETAILS_TABLE: {
    NAME: `address`,
    ID: "id",
    DATE_OF_JOIN: "date_of_join",
    EMPLOYEE_ID: "employee_id",
    ADAMANT_CODE: "adamant_code",
    DOL: "dol",
    DESIGNATION: "designation",
    SUPERVISOR: "supervisor",
    JOB_LOCATION: "job_location",
    JOB_LOCATION_STATE: "job_location_state",
    ON_ROLL: "on_roll",
    DOB: "dob",
    EMERGENCY_NO: "emergency_no",
    SELF_AADHAR_NO: "self_aadhar_no",
    QUALIFICATION: "qualification",
    FATHER_NAME: "father_name",
    MOTHER_NAME: "mother_name",
    SPOUSE_NAME: "spouse_name",
    ESIC_NO: "esic_no",
    UAN: "uan",
    PAN_NO: "pan_no",
    ACCOUNT_NO: "account_no",
    IFSC_CODE: "ifsc_code",
    BANK_NAME: "bank_name",
    PERMANENT_ADDRESS: "permanent_address",
    CORRESPONDENCE_ADDRESS: "correspondence_address",
    DAILY_RATE: "daily_rate"
  },
  COMMON: {
    ARCHIVED: "archived",
    SELECT_ALL: "*",
    DESC: "desc",
    ASC: "asc",
    ZERO_INDEX: 0
  },
  STORAGE: {
    BUCKET_NAME: "gs://vida-fan.appspot.com",
    LOCATIONS: {
      USERS: "vida-fan/images/users/",
    },
  },
  ERROR_CODES: {
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401
  }
};
