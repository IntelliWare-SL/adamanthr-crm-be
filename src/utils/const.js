export default {
  USER_TABLE: {
    NAME: "vida-fan.user",
    UID: "uid",
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    ROLE: "role",
    EMAIL: "email",
    SEX: "sex",
    DOB: "dob",
    ADDRESS: "address",
    FAVOURITE_SPORT: "favouriteSport",
    FAVOURITE_CLUB: "favouriteClub",
  },
  ROLE_TABLE: {
    NAME: "vida-fan.role",
    ID: "id",
    name: "name",
    DESCRIPTION: "description",
    values: {
      ADMIN: "admin",
      USER: "user",
    },
  },
  COMMON: {
    ARCHIVED: "archived",
    SELECT_ALL: "*",
    DESC: "desc",
    ASC: "asc",
  },
  STORAGE: {
    BUCKET_NAME: "gs://vida-fan.appspot.com",
    LOCATIONS: {
      USERS: "vida-fan/images/users/",
    },
  },
};
