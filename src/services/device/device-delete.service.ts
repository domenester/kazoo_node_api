import { serviceApi } from "../service.api";

export const DeviceDeleteService = async (deviceId: string): Promise<any> => {
  const location = `/devices/${deviceId}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "delete", {}, {}, "DeviceDeleteService"
  );
  return response;
};
