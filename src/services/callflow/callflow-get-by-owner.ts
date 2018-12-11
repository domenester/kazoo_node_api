import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../../components/error";
import {default as logger} from "../../components/logger/logger";
import { AuthApiService } from "../auth-api.service";

export const CallflowGetByOwnerService = async (username: string): Promise<any> => {
  const path = `${process.env.KAZOO_URL_SERVICES}/callflows`;
  const response = await request(
    path, {
      headers: {
        "X-Auth-Token" : await AuthApiService()
      },
      method: "GET",
      rejectUnauthorized: false,
    },
  ).then( res => {
    const resParsed = JSON.parse(res);
    return resParsed.data.filter(callflow => {
      return callflow.numbers[0] === username;
    })
  }).catch( (err) => {
    logger.error(`Error requesting for: ${path}`);
    return errorGenerator(
      err,
      err.statusCode,
      "CallflowGetByOwnerService");
  });

  return response;
};
