import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../../components/error";
import {default as logger} from "../../components/logger/logger";
import { IUser, IUserNew, IUserUpdate } from "../../interfaces";
import { userUpdateNormalized } from "../../normalizer/user";
import { AuthApiService } from "../auth-api.service";

export const UserUpdateService = async (user: IUserUpdate): Promise<any> => {
  const path = `${process.env.KAZOO_URL_SERVICES}/users/${user.id}`;
  const response = await request(
    path, {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token" : await AuthApiService()
      },
      method: "PATCH",
      body: JSON.stringify(
        userUpdateNormalized(user)
      ),
      rejectUnauthorized: false,
    },
  ).then( res => JSON.parse(res) )
  .catch( (err) => {
    logger.error(`Error requesting for: ${path}`);
    return errorGenerator(
      err,
      err.statusCode,
      "UserUpdateService");
  });

  return response;
};
