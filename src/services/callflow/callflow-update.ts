import { serviceApi } from "../service.api";

export const CallflowUpdateService = async (
  data: any, callflowId: string
): Promise<any> => {
  const location = `/callflows/${callflowId}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "patch", data, {}, "CallflowUpdateService"
  );
  return response;
};
