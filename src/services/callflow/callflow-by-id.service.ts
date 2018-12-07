import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../../components/error";
import {default as logger} from "../../components/logger/logger";
import { callflowCreateNormalized } from "../../normalizer/callflow";
import { AuthApiService } from "../auth-api.service";

export const CallflowByIdService = async (callflowId: string): Promise<any> => {
  const path = `${process.env.KAZOO_URL_SERVICES}/callflows/${callflowId}`;
  const response = await request(
    path, {
      headers: {
        "X-Auth-Token" : await AuthApiService()
      },
      method: "GET",
      rejectUnauthorized: false,
    },
  ).then(res => JSON.parse(res))
  .catch( (err) => {
    logger.error(`Error requesting for: ${path}`);
    return errorGenerator(
      err,
      err.statusCode,
      "CallflowByIdService");
  });
  
  return response;
};
