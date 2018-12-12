import { serviceApi } from "../service.api";

export const UserByUsernameService = async (username: string): Promise<any> => {
  const location = `/users?filter_username=${username}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "get", {}, {}, "UserByUsernameService"
  );
  return response;
};
