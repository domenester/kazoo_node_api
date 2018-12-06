import { IUserNew } from "../../interfaces";

export const userNewNormalized = (userNew: IUserNew) => ({
  data: {
    first_name: userNew.name,
    last_name: userNew.department,
    email: userNew.email,
    username:userNew.racf,
    password: "123456",
    devices: [],
    callflow: null
  }
});
