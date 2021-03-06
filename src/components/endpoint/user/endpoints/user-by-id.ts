import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import { UserService, CallflowListService } from "../../../../services";
import responseMessages from "../../../../config/endpoints-response-messages";
import { usersWithExtension } from "../../../../utils/users-with-extension";
import { UserByIdService } from "../../../../services/user/user-by-id.service";
import { UserByIdValidation } from "../validations/user-by-id.validation";
import { CallflowByIdService } from "../../../../services/callflow/callflow-by-id.service";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class UserById implements IEndpoint<Request, {}> {
  public path = "/:id";
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

    const validation = await UserByIdValidation(req.parameters);
    if (validation instanceof Error) { return validation; }

    const userById = await UserByIdService(req.parameters.id);
    let user: any;
    if (userById.data.callflow) {
      user = userById.data;
      const callflowById = await CallflowByIdService(userById.data.callflow);
      user["extension"] = callflowById.data["numbers"][1];
    }

    return endpointResponseNormalizer(user || userById.data);
  }
}
