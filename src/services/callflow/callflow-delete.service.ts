import { serviceApi } from "../service.api";

export const CallflowDeleteService = async (callflowId: string): Promise<any> => {
  const location = `/callflows/${callflowId}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "delete", {}, {}, "DeviceDeleteService"
  );
  return response;
};
