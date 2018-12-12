import { serviceApi } from "../service.api";

export const DeviceGetByOwnerService = async (userId: string): Promise<any> => {
  const location = `/devices?filter_owner_id=${userId}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "get", {}, {}, "DeviceGetByOwnerService"
  );
  return response;
};
