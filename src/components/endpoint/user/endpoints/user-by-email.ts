import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import responseMessages from "../../../../config/endpoints-response-messages";
import { UserByEmailValidation } from "../validations/user-by-email.validation";
import { CallflowByIdService } from "../../../../services/callflow/callflow-by-id.service";
import { UserByDepartmentService } from "../../../../services/user/user-by-department";
import { errorGenerator } from "../../../error/error";
import { user as errorMessage } from "../../../error/error-messages";
import { endpointResponseNormalizer } from "../../../../normalizer";
import { UserByEmailService } from "../../../../services/user/user-by-email";
import { UserByIdService } from "../../../../services/user/user-by-id.service";

export default class UserByEmail implements IEndpoint<Request, {}> {
  public path = "/email/:email";
  public method: Verb = "get";
  public fullPath: string;
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }
  public handler = async (req: IRequest): Promise<HandlerResponse> => {
    this.logger.info(`Accessing path: ${this.path}`);

    const validation = await UserByEmailValidation(req.parameters);
    if (validation instanceof Error) { return validation; }

    const userByEmail = await UserByEmailService(req.parameters.email);

    if (!userByEmail.data) {
      return errorGenerator(errorMessage.notFound, 400, "userByEmail");
    }

    // The user need to be search by id because getting by filter, dont give us all attriutes
    const users = [];

    const usersById = await Promise.all(
      userByEmail.data.map((user) => UserByIdService(user.id))
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

    return endpointResponseNormalizer(users, responseMessages.userList);
  }
}
