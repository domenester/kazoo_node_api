import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IRequest, Verb, HandlerResponse} from "../../../endpoint/endpoint.interface";
import { UserService } from "../../../../services";
import responseMessages from "../../../../config/endpoints-response-messages";
import { UserDeleteValidation } from "../validations/user-delete.validation";

export default class UserNew implements IEndpoint<Request, {}> {
  public path = "/:id";
  public fullPath: string;
  public method: Verb = "delete";
  public bodySchema = "";
  private logger: winston.Logger;
  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`
  }
  public handler = async (req: IRequest): Promise<HandlerResponse> => {
    this.logger.info(`Accessing path: ${this.path}`);

    const validation = await UserDeleteValidation(req.parameters);
    if (validation instanceof Error) { return validation; }

    const userDeleted = await UserService.remove(req.parameters.id);
    if (userDeleted instanceof Error) { return userDeleted; }

    return {data: userDeleted, message: responseMessages.userDelete};
  }
}
