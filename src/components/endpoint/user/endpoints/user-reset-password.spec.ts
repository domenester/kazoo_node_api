// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import { promisify } from "util";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import { login as errorMessages } from "../../../error/error-messages";
import { IRequest } from "../../endpoint.interface";
import UserList from "./user-list";
import UserApi from "../user.api";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import { IUserNew } from "../../../../interfaces";
import { UserNew } from "../../../../services/user/user-new.service";
import { UserDeleteService } from "../../../../services/user/user-delete.service";
import UserResetPassword from "./user-reset-password";
import { defaultPassword } from "../../../../normalizer/user";

describe("Testing User Reset Password", async () => {

  let userCreated: any;

  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should create a new user to update it", async () => {
    const body: IUserNew = {
      racf: "resetpassword",
      department: "department",
      email: "resetpassword@mock.com",
      extension: "2222",
      name: "Reset Password"
    };
    const response = await UserNew(body);
    expect(response.email).to.be.equal(body.email);
    expect(response.username).to.be.equal(body.racf);
    userCreated = response;
  });

  it("should update user and devices password", async () => {
    const userApi = new UserApi(logger);
    const userResetPassword = new UserResetPassword(logger, userApi.path);
    const body = {
      email: userCreated.email,
      newPassword: "anypassword"
    }

    let response = await request(
      `http://${NODE_HOST()}:${NODE_PORT()}${userResetPassword.fullPath}`,
      {
        method: userResetPassword.method,
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        rejectUnauthorized: false
      }
    );
    response = JSON.parse(response);
    expect(response.data).to.be.true;
  }).timeout(4000);

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  });

});