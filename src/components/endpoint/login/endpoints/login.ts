import {Request} from "express-serve-static-core";
import * as request from "request-promise";
import * as winston from "winston";
import { LoginService } from "../../../../services";
import {HandlerResponse, IEndpoint, IRequest, Verb} from "../../../endpoint/endpoint.interface";
import { errorGenerator } from "../../../error/error";
import { login as errorMessage } from "../../../error/error-messages";
import { LoginValidation } from "../validation/login.validation";
import responseMessages from "../../../../config/endpoints-response-messages";
import { endpointResponseNormalizer } from "../../../../normalizer";

export default class Login implements IEndpoint<Request, {}> {
  public path = "/login";
  public fullPath: string;
  public method: Verb = "put";
  public bodySchema = LoginValidation;
  private logger: winston.Logger;

  constructor(logger: winston.Logger, fatherPath: string) {
    this.logger = logger;
    this.fullPath = `${fatherPath}${this.path}`;
  }

  public handler = async (req: IRequest): Promise<HandlerResponse> => {
    this.logger.info(`Accessing path: ${this.path}`);

    const validation = await this.bodySchema(req.body);

    if (validation instanceof Error) {
      return validation;
    }

    const loginService = await LoginService(req.body).catch(err => err);

    if (loginService instanceof Error) { return loginService; }

    return endpointResponseNormalizer(loginService, responseMessages.login);
  }
}
