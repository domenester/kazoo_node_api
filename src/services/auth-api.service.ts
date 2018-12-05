import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../components/error";
import {default as logger} from "../components/logger/logger";

export const AuthApiService = async (): Promise<any> => {
  const path = `${process.env.KAZOO_API_URL}/api_auth`;
  const response = await request(
    path, {
      body: JSON.stringify({
        data : {
          api_key: process.env.KAZOO_API_KEY
        }
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      rejectUnauthorized: false,
    },
  ).then(res => JSON.parse(res)["auth_token"])
  .catch( (err) => {
    logger.error(`Error requesting for: ${path}`);
    return errorGenerator(
      errorMessage.unauthorized,
      err.statusCode,
      "ApiAuthentication");
  });
  
  return response;
};
