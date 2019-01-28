import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../../components/error";
import {default as logger} from "../../components/logger/logger";
import { AuthApiService } from "../auth-api.service";
import { serviceApi } from "../service.api";

export const UserListService = async (): Promise<any> => {
  const location = "/users?paginate=false";
  const serviceApiInstance = serviceApi(location);
  const response = await serviceApiInstance.request(
    "get", {}, {}, "UserListService"
  );
  return response;
};
