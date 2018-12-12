import { serviceApi } from "../service.api";

export const UserByEmailService = async (email: string): Promise<any> => {
  const location = `/users?filter_email=${email}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "get", {}, {}, "UserByEmailService"
  );
  return response;
};
