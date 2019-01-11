import { serviceApi } from "../service.api";

export const UserByDepartmentService = async (department: string): Promise<any> => {
  const location = `/users?filter_last_name=${department}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "get", {}, {}, "UserByDepartmentService"
  );
  return response;
};
