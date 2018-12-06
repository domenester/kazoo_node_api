import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../../components/error";
import {default as logger} from "../../components/logger/logger";
import { AuthApiService } from "../auth-api.service";

export const CallflowDeleteService = async (callflowId: string): Promise<any> => {
  const path = `${process.env.KAZOO_URL_SERVICES}/callflows/${callflowId}`;
  const response = await request(
    path, {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token" : await AuthApiService()
      },
      method: "DELETE",
      rejectUnauthorized: false,
    },
  ).then(res => JSON.parse(res))
  .catch( (err) => {
    logger.error(`Error requesting for: ${path}`);
    return errorGenerator(
      err,
      err.statusCode,
      "DeviceDeleteService");
  });
  
  return response;
};
