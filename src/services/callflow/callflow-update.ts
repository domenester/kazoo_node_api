import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../../components/error";
import {default as logger} from "../../components/logger/logger";
import { AuthApiService } from "../auth-api.service";

export const CallflowUpdateService = async (
  data: any, callflowId: string
): Promise<any> => {
  const path = `${process.env.KAZOO_URL_SERVICES}/callflows/${callflowId}`;
  const response = await request(
    path, {
      body: JSON.stringify(data),
      headers: { "X-Auth-Token" : await AuthApiService() },
      method: "PATCH",
      rejectUnauthorized: false,
    },
  ).then( res => JSON.parse(res))
  .catch( (err) => {
    logger.error(`Error requesting for: ${path}`);
    return errorGenerator(
      err,
      err.statusCode,
      "CallflowUpdateService");
  });

  return response;
};