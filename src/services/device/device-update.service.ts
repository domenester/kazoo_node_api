import { serviceApi } from "../service.api";

export const DeviceUpdateService = async (
  data: any, deviceId: string
): Promise<any> => {
  const location = `/devices/${deviceId}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "patch", data, {}, "DeviceUpdateService"
  );
  return response;
};
