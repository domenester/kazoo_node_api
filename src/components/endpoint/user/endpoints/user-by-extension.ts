import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import responseMessages from "../../../../config/endpoints-response-messages";
import { UserByExtensionValidation } from "../validations/user-by-extension.validation";
import { CallflowByIdService } from "../../../../services/callflow/callflow-by-id.service";
import { UserByIdService } from "../../../../services/user/user-by-id.service";
import { UserByExtensionService } from "../../../../services/user/user-by-extension";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class UserByExtension implements IEndpoint<Request, {}> {
  public path = "/extension/:extension";
  public method: Verb = "get";
  public fullPath: string;
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }
  public handler = async (req: IRequest): Promise<HandlerResponse> => {
    this.logger.info(`Accessing path: ${this.fullPath}`);

    const validation = await UserByExtensionValidation(req.parameters);
    if (validation instanceof Error) { return validation; }

    const userByExtension = await UserByExtensionService(req.parameters.extension).catch(err => err);

    if (!userByExtension || !userByExtension.data.length) {
      return endpointResponseNormalizer({});
    }

    const userById = await UserByIdService(userByExtension.data[0].id).catch(err => err);

    let user: any;
    if (userById.data.callflow) {
      user = userById.data;
      const callflowById = await CallflowByIdService(userById.data.callflow);
      user["extension"] = callflowById.data["numbers"][1];
    }

    return endpointResponseNormalizer(user || userById.data, responseMessages.userList);
  }
}
