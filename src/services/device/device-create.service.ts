import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../../components/error";
import {default as logger} from "../../components/logger/logger";
import { deviceCreateNormalized } from "../../normalizer/device";
import { AuthApiService } from "../auth-api.service";

export const DeviceCreateService = async (userId: string, username: string, token?: string): Promise<any> => {
  const path = `${process.env.KAZOO_URL_SERVICES}/devices`;
  const response = await request(
    path, {
      body: JSON.stringify(
        deviceCreateNormalized(userId, username)
      ),
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token" : token || await AuthApiService()
      },
      method: "PUT",
      rejectUnauthorized: false,
    },
  ).then(res => JSON.parse(res))
  .catch( (err) => {
    logger.error(`Error requesting for: ${path}`);
    return errorGenerator(
      err,
      err.statusCode,
      "DeviceCreateService");
  });
  
  return response;
};
