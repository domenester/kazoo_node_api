import { serviceApi } from "../service.api";

export const ScheduledConfByUserService = async (username: string): Promise<any> => {
  const path = process.env.CONFERENCE_API_URL;
  const location = `/conferences?user=${username}`;
  const serviceApiInstance = serviceApi(location, path);
  const response = await serviceApiInstance.request(
    "post", {}, {}, "ScheduledConfByUserService"
  );
  return response;
};
