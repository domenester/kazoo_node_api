
import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../../endpoint/endpoint.interface";
import UserNew from "./endpoints/user-new";
import UserDelete from "./endpoints/user-delete";
import UserList from "./endpoints/user-list";
import UserById from "./endpoints/user-by-id";
import UserUpdatePassword from "./endpoints/user-update-password";

class UserApi implements IEndpointAPI {
  public path = "/users";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new UserNew(this.logger, this.path),
      new UserById(this.logger, this.path),
      new UserDelete(this.logger, this.path),
      new UserList(this.logger, this.path),
      new UserUpdatePassword(this.logger, this.path)
    ];
  }
}

export default UserApi;
