import { userUpdatePasswordNormalized } from "../../normalizer/user";
import { serviceApi } from "../service.api";
import { UserByIdService } from "./user-by-id.service";

export const UserUpdatePasswordService = async (userId: string, password: string): Promise<any> => {
  let user = await UserByIdService(userId).catch(err => err);
  user.data["password"] = password;
  const location = `/users/${userId}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "post", { data: user.data}, {}, "UserUpdatePasswordService"
  );
  return response;
};
