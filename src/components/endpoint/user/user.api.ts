
import {Request} from "express-serve-static-core";
import * as winston from "winston";
import {IEndpoint, IEndpointAPI} from "../../endpoint/endpoint.interface";
import UserNew from "./endpoints/user-new";
import UserDelete from "./endpoints/user-delete";
import UserList from "./endpoints/user-list";
import UserById from "./endpoints/user-by-id";
import UserUpdatePassword from "./endpoints/user-update-password";
import UserResetPassword from "./endpoints/user-reset-password";
import UserUpdate from "./endpoints/user-update";
import UserByDepartment from "./endpoints/user-by-department";
import UploadProfilePicture from "./endpoints/user-update-picture";
import UserByExtension from "./endpoints/user-by-extension";
import UserByEmail from "./endpoints/user-by-email";
import UserAddContact from "./endpoints/user-add-contact";

class UserApi implements IEndpointAPI {
  public path = "/users";
  public endpoints: Array<IEndpoint<Request, any>>;
  private logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
    this.endpoints = [
      new UploadProfilePicture(this.logger, this.path),
      new UserNew(this.logger, this.path),
      new UserById(this.logger, this.path),
      new UserDelete(this.logger, this.path),
      new UserList(this.logger, this.path),
      new UserUpdatePassword(this.logger, this.path),
      new UserResetPassword(this.logger, this.path),
      new UserUpdate(this.logger, this.path),
      new UserByDepartment(this.logger, this.path),
      new UserByExtension(this.logger, this.path),
      new UserByEmail(this.logger, this.path),
      new UserAddContact(this.logger, this.path)
    ];
  }
}

export default UserApi;
