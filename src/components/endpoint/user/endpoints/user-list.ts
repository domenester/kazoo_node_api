import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import { UserService, CallflowListService } from "../../../../services";
import responseMessages from "../../../../config/endpoints-response-messages";
import { usersWithExtension } from "../../../../utils/users-with-extension";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class UserList implements IEndpoint<Request, {}> {
  public path = "";
  public method: Verb = "get";
  public fullPath: string;
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }
  public handler = async (request: IRequest): Promise<HandlerResponse> => {
    this.logger.info(`Accessing path: ${this.fullPath}`);

    const usersAndCallflows = await Promise.all([
      UserService.list(),
      CallflowListService()
    ]).catch(err => err);

    const usersList = usersAndCallflows[0].data;
    const callflowsList = usersAndCallflows[1].data;

    const users = usersWithExtension(usersList, callflowsList);

    return endpointResponseNormalizer(users, responseMessages.userList);
  }
}
