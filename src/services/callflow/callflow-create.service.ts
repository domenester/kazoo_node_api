import { callflowCreateNormalized } from "../../normalizer/callflow";
import { serviceApi } from "../service.api";

export const CallflowCreateService = async (
  userId: string, username: string, extension: string
): Promise<any> => {
  const location = `/callflows`;
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "put", callflowCreateNormalized(userId, username, extension), {}, "CallflowCreateService"
  );
  return response;
};
