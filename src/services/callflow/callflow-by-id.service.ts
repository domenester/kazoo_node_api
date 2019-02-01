import { serviceApi } from "../service.api";

export const CallflowByIdService = async (callflowId: string): Promise<any> => {
  const location = `/callflows/${callflowId}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "get", {}, {}, "CallflowByIdService"
  ).catch(err => err);
  return response;
};
