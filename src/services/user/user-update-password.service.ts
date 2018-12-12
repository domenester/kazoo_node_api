import { userUpdatePasswordNormalized } from "../../normalizer/user";
import { serviceApi } from "../service.api";

export const UserUpdatePasswordService = async (userId: string, password: string): Promise<any> => {
  const location = `/users/${userId}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "patch", userUpdatePasswordNormalized(password), {}, "UserUpdatePasswordService"
  );
  return response;
};
