import { serviceApi } from "../service.api";

export const ScheduledConfByIdService = async (conferenceId: string): Promise<any> => {
  const path = process.env.CONFERENCE_API_URL;
  const location = `/conferences/${conferenceId}`;
  const serviceApiInstance = serviceApi(location, path);
  const response = await serviceApiInstance.request(
    "get", {}, {}, "ScheduledConfByIdService"
  );
  return response;
};
