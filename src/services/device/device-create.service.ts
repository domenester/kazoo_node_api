import { deviceCreateNormalized } from "../../normalizer/device";
import { serviceApi } from "../service.api";

export const DeviceCreateService = async (userId: string, username: string, token?: string): Promise<any> => {
  const location = `/devices`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "put", deviceCreateNormalized(userId, username), {}, "DeviceCreateService"
  );
  return response;
};
