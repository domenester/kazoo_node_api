import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import responseMessages from "../../../../config/endpoints-response-messages";
import { CallflowByIdService } from "../../../../services/callflow/callflow-by-id.service";
import { errorGenerator } from "../../../error/error";
import { user as errorMessage } from "../../../error/error-messages";
import { endpointResponseNormalizer } from "../../../../normalizer";
import { UserByIdService } from "../../../../services/user/user-by-id.service";
import { UserByUsernameValidation } from "../validations/user-by-username.validation";
import { UserByUsernameService } from "../../../../services/user/user-by-username";

export default class UserByUsername implements IEndpoint<Request, {}> {
  public path = "/username/:username";
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

    const validation = await UserByUsernameValidation(req.parameters);
    if (validation instanceof Error) { return validation; }

    const userByUsername = await UserByUsernameService(req.parameters.username);

    if (!userByUsername.data) {
      return errorGenerator(errorMessage.notFound, 400, "userByUsername");
    }

    // The user need to be search by id because getting by filter, dont give us all attriutes
    const users = [];

    const usersById = await Promise.all(
      userByUsername.data.map((user) => UserByIdService(user.id))
    ).catch(err => err);

    const callflowsById = await Promise.all(
      usersById.map( user => CallflowByIdService((user as any).data.callflow))
    ).catch(err => err);

    usersById.map( (user, index) => {
      if (callflowsById[index].data) {
        (user as any).data["extension"] = callflowsById[index].data["numbers"][1];
      }
      users.push( (user as any).data );
    })

    return endpointResponseNormalizer(users[0] || {});
  }
}
