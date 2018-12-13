import { serviceApi } from "../service.api";

export const ScheduledConfCreateWithIdService = async (
  conferenceId: string, body: any
): Promise<any> => {
  const path = process.env.CONFERENCE_API_URL;
  const location = `/conferences/${conferenceId}`;
  const serviceApiInstance = serviceApi(location, path);
  const response = await serviceApiInstance.request(
    "put", body, {}, "ScheduledConfCreateWithIdService"
  );
  return response;
};
