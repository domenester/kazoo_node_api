import { conferenceCreateNormalized } from "../../normalizer/conference";
import { serviceApi } from "../service.api";

export const ConferenceCreateService = async (id: string, endpoint: string): Promise<any> => {
  const location = `/conferences/${id}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "put", conferenceCreateNormalized(id, endpoint), {}, "ConferenceCreateService"
  );
  return response;
};
