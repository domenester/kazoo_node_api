import { serviceApi } from "../service.api";

export const UserDeleteService = async (userId: string): Promise<any> => {
  const location = `/users/${userId}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "delete", {}, {}, "UserDelete"
  );
  return response;
};
