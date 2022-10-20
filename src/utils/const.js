const schema = "public"

export default {
  USER_TABLE: {
    NAME: `user`,
    ID: "id",
    FIRST_NAME: "first_name",
    LAST_NAME: "last_name",
    TYPE: "type",
    EMAIL: "email",
  },
  ROLE_TABLE: {
    NAME: `user_type`,
    ID: "id",
    TYPE: "type",
    values: {
      ADMIN: "admin",
      EMPLOYEE: "employee",
    },
  },
  COMMON: {
    ARCHIVED: "archived",
    SELECT_ALL: "*",
    DESC: "desc",
    ASC: "asc",
    ZERO_INDEX : 0
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
