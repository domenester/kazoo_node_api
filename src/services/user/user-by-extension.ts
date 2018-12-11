import * as request from "request-promise";
import { errorGenerator, login as errorMessage } from "../../components/error";
import {default as logger} from "../../components/logger/logger";
import { AuthApiService } from "../auth-api.service";
import { CallflowListService } from "../callflow";
import { UserByUsernameService } from "./user-by-username";

export const UserByExtensionService = async (extension: string): Promise<any> => {
  const callflows = await CallflowListService().catch(err => err);
  if (!callflows.data) { return null; }
  for( let i = 0; i < callflows.data.length; i++) {
    if (callflows.data[i]["numbers"].indexOf(extension) > -1) {
      const userByUsername = await UserByUsernameService(callflows.data[i]["numbers"][0])
      .catch(err => err);
      return userByUsername;
    }
  }
  return null;
};
