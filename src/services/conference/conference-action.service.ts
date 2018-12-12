import { conferenceActionNormalized } from "../../normalizer/conference/conference-action.normalizer";
import { serviceApi } from "../service.api";

export const ConferenceActionService = async (id: string, action: string): Promise<any> => {
  const location = `/conferences/${id}/participants`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "put", conferenceActionNormalized(action), {}, "ConferenceActionService"
  );
  return response;
};
