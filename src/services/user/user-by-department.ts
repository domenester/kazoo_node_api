import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../../components/error";
import {default as logger} from "../../components/logger/logger";
import { AuthApiService } from "../auth-api.service";

export const UserByDepartmentService = async (department: string): Promise<any> => {
  const path = `${process.env.KAZOO_URL_SERVICES}/users?filter_last_name=${department}`;
  const response = await request(
    path, {
      headers: {
        "X-Auth-Token" : await AuthApiService()
      },
      method: "GET",
      rejectUnauthorized: false,
    },
  ).then( res => JSON.parse(res))
  .catch( (err) => {
    logger.error(`Error requesting for: ${path}`);
    return errorGenerator(
      err,
      err.statusCode,
      "UserByDepartmentService");
  });

  return response;
};
