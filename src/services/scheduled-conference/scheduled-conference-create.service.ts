import { serviceApi } from "../service.api";

export const ScheduledConfCreateService = async (body: any): Promise<any> => {
  const path = process.env.CONFERENCE_API_URL;
  const location = `/conferences`;
  const serviceApiInstance = serviceApi(location, path);
  const response = await serviceApiInstance.request(
    "post", body, {}, "ScheduledConfCreateService"
  );
  return response;
};
