
import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../../endpoint/endpoint.interface";
import UserNew from "./endpoints/user-new";
import UserDelete from "./endpoints/user-delete";

class UserApi implements IEndpointAPI {
  public path = "/users";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new UserNew(this.logger, this.path),
      new UserDelete(this.logger, this.path)
    ];
  }
}

export default UserApi;
