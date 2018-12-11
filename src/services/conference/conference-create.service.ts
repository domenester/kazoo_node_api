import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../../components/error";
import {default as logger} from "../../components/logger/logger";
import { AuthApiService } from "../auth-api.service";
import { conferenceCreateNormalized } from "../../normalizer/conference";

export const ConferenceCreateService = async (id: string, endpoint: string): Promise<any> => {
  const path = `${process.env.KAZOO_URL_SERVICES}/conferences/${id}`;
  const response = await request(
    path, {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token" : await AuthApiService()
      },
      method: "POST",
      body: JSON.stringify(
        conferenceCreateNormalized(id, endpoint)
      ),
      rejectUnauthorized: false,
    },
  ).then( res => JSON.parse(res))
  .catch( (err) => {
    logger.error(`Error requesting for: ${path}`);
    return errorGenerator(
      err,
      err.statusCode,
      "ConferenceCreateService");
  });

  return response;
};
