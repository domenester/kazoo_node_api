import { serviceApi } from "../service.api";

export const ConferenceByIdService = async (id: string): Promise<any> => {
  const location = `/conferences/${id}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "get", {}, {}, "ConferenceByIdService"
  );
  return response;
};
