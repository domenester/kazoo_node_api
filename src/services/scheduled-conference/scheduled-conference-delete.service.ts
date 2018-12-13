import { serviceApi } from "../service.api";

export const ScheduledConfDeleteService = async (conferenceId: string): Promise<any> => {
  const path = process.env.CONFERENCE_API_URL;
  const location = `/conferences/${conferenceId}`;
  const serviceApiInstance = serviceApi(location, path);
  const response = await serviceApiInstance.request(
    "delete", {}, {}, "ScheduledConfDeleteService"
  );
  return response;
};
