import { conferenceActionNormalized } from "../../normalizer/conference/conference-action.normalizer";
import { serviceApi } from "../service.api";

export const ConferenceActionParticipantService = async (
  id: string, participantId: string, action: string
): Promise<any> => {
  const location = `/conferences/${id}/participants/${participantId}`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "put", conferenceActionNormalized(action), {}, "ConferenceActionParticipantService"
  );
  return response;
};
