import { serviceApi } from "../service.api";

export const ScheduledConfByUserService = async (userId: string): Promise<any> => {
  const path = process.env.CONFERENCE_API_URL;
  const location = `/conferences?user=${userId}`;
  const serviceApiInstance = serviceApi(location, path);
  const response = await serviceApiInstance.request(
    "post", {}, {}, "ScheduledConfByUserService"
  );
  return response;
};
