import { serviceApi } from "../service.api";

export const UserByIdService = async (userId: string): Promise<any> => {
  const location = `/users/${userId}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "get", {}, {}, "UserByIdService"
  );
  return response;
};
