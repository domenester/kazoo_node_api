import { serviceApi } from "../service.api";

export const UserListService = async (): Promise<any> => {
  const location = "/users?paginate=false";
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "get", {}, {}, "UserListService"
  );
  return response;
};
