import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../../components/error";
import {default as logger} from "../../components/logger/logger";
import { IUser, IUserNew } from "../../interfaces";
import { userNewNormalized } from "../../normalizer/user";
import { AuthApiService } from "../auth-api.service";

export const UserNew = async (userNew: IUserNew): Promise<any> => {
  const path = `${process.env.KAZOO_URL_SERVICES}/users`;
  const response = await request(
    path, {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token" : await AuthApiService()
      },
      method: "PUT",
      body: JSON.stringify(
        userNewNormalized(userNew)
      ),
      rejectUnauthorized: false,
    },
  ).then( res => JSON.parse(res)["data"])
  .catch( (err) => {
    logger.error(`Error requesting for: ${path}`);
    return errorGenerator(
      err,
      err.statusCode,
      "UserNew");
  });

  return response;
};
