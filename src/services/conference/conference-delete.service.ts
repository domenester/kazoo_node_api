import { serviceApi } from "../service.api";

export const ConferenceDeleteService = async (id: string): Promise<any> => {
  const location = `/conferences/${id}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "delete", {}, {}, "ConferenceDeleteService"
  );
  return response;
};
