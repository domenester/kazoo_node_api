import { IUserNew } from "../../interfaces";

export const defaultPassword = "123456";

export const userNewNormalized = (userNew: IUserNew) => ({
  data: {
    first_name: userNew.name,
    last_name: userNew.department,
    email: userNew.email,
    username:userNew.racf,
    password: defaultPassword,
    devices: [],
    callflow: null
  }
});
