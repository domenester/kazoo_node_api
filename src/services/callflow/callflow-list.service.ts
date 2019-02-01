import { serviceApi } from "../service.api";

export const CallflowListService = async (): Promise<any> => {
  const location = `/callflows?paginate=false`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "get", {}, {}, "CallflowListService"
  );
  return response;
};
