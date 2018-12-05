import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../../components/error";
import {default as logger} from "../../components/logger/logger";
import { callflowCreateNormalized } from "../../normalizer/callflow";
import { AuthApiService } from "../auth-api.service";

export const CallflowCreateService = async (
  userId: string, username: string, extension: string
): Promise<any> => {
  const path = `${process.env.KAZOO_API_URL}/callflows`;
  const response = await request(
    path, {
      body: JSON.stringify(
        callflowCreateNormalized(userId, username, extension)
      ),
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token" : await AuthApiService()
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
      "CallflowCreateService");
  });
  
  return response;
};
