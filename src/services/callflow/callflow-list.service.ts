import { serviceApi } from "../service.api";

export const CallflowListService = async (): Promise<any> => {
  const location = `/callflows`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "get", {}, {}, "CallflowListService"
  );
  return response;
};
