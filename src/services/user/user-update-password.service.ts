import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../../components/error";
import {default as logger} from "../../components/logger/logger";
import { AuthApiService } from "../auth-api.service";
import { userUpdatePasswordNormalized } from "../../normalizer/user";

export const UserUpdatePasswordService = async (userId: string, password: string): Promise<any> => {
  const path = `${process.env.KAZOO_URL_SERVICES}/users/${userId}`;
  const response = await request(
    path, {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token" : await AuthApiService()
      },
      method: "PATCH",
      body: JSON.stringify(
        userUpdatePasswordNormalized(password)
      ),
      rejectUnauthorized: false,
    },
  ).then( res => JSON.parse(res) )
  .catch( (err) => {
    logger.error(`Error requesting for: ${path}`);
    return errorGenerator(
      err,
      err.statusCode,
      "UserUpdatePasswordService");
  });

  return response;
};
