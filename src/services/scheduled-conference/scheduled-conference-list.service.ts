import { serviceApi } from "../service.api";

export const ScheduledConfListService = async (): Promise<any> => {
  const path = process.env.CONFERENCE_API_URL;
  const location = `/conferences`;
  const serviceApiInstance = serviceApi(location, path);
  const response = await serviceApiInstance.request(
    "get", {}, {}, "ScheduledConfListService"
  );
  return response;
};
