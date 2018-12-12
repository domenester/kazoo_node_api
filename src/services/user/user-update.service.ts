import { IUserUpdate } from "../../interfaces";
import { userUpdateNormalized } from "../../normalizer/user";
import { serviceApi } from "../service.api";

export const UserUpdateService = async (user: IUserUpdate): Promise<any> => {
  const location = `/users/${user.id}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "patch", userUpdateNormalized(user), {}, "UserUpdateService"
  );
  return response;
};
