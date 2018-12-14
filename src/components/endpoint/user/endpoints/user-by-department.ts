import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import responseMessages from "../../../../config/endpoints-response-messages";
import { UserByDepartmentValidation } from "../validations/user-by-department.validation";
import { CallflowByIdService } from "../../../../services/callflow/callflow-by-id.service";
import { UserByDepartmentService } from "../../../../services/user/user-by-department";
import { errorGenerator } from "../../../error/error";
import { user as errorMessage } from "../../../error/error-messages";
import { UserByIdService } from "../../../../services/user/user-by-id.service";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class UserByDepartment implements IEndpoint<Request, {}> {
  public path = "/department/:department";
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

    const validation = await UserByDepartmentValidation(req.parameters);
    if (validation instanceof Error) { return validation; }

    const userByDepartment = await UserByDepartmentService(req.parameters.department);

    if (!userByDepartment.data) {
      return errorGenerator(errorMessage.notFound, 400, "UserByDepartment");
    }

    // The user need to be search by id because getting by filter, dont give us all attriutes
    const users = [];

    const usersById = await Promise.all(
      userByDepartment.data.map((user) => UserByIdService(user.id))
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
