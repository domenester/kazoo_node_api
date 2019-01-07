import { serviceApi } from "../service.api";

export interface IScheduledConfUpdate {
  moderator?: string,
  date?: string,
  id: string,
  subject?: string,
  body?: string,
  participants?: Array< { participant: string, email: string } >
}

export const ScheduledConfUpdateService = async (conference: IScheduledConfUpdate): Promise<any> => {
  const path = process.env.CONFERENCE_API_URL;
  const location = `/conferences/${conference.id}`;
  const serviceApiInstance = serviceApi(location, path);
  const response = await serviceApiInstance.request(
    "put", conference, {}, "ScheduledConfUpdateService"
  );
  return response;
};
