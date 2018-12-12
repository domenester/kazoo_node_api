import { IUserNew } from "../../interfaces";
import { userNewNormalized } from "../../normalizer/user";
import { serviceApi } from "../service.api";

export const UserNew = async (userNew: IUserNew): Promise<any> => {

  const location = "/users";
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "put", userNewNormalized(userNew), {}, "UserNew"
  );
  return response;
};
