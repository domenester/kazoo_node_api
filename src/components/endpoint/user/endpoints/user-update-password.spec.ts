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
import UserUpdatePassword from "./user-update-password";
import { defaultPassword } from "../../../../normalizer/user";
import { createNewUser } from "../../../../services/user/user-new.service.spec";
import { userMock } from "../../../../services/user/mocks";
import { ServiceTestApi } from "../../../../services/service-test.api";

export const resetPasswordByEndpoint = async (userId: string, body: any) => {
  const userApi = new UserApi(logger);
  const userUpdatePassword = new UserUpdatePassword(logger, userApi.path);
  const serviceTestApiInstance = new ServiceTestApi(`${userApi.path}/${userId}/update_password`);
  const response = await serviceTestApiInstance.request(
    userUpdatePassword.method, body, {}, "Testing User Update Password"
  );
  return response;
}

describe("Testing User Update Password", async () => {

  let userCreated: any;

  before("Starting server...", async () => {
    await server.start();
  });

  after( async () => {
    server.stop();
  });

  it("should create a new user to update it", async () => {
    const body: IUserNew = userMock;
    userCreated = await createNewUser(body);
  }).timeout(5000);

  it("should throw because of invalid password", async () => {
    const userApi = new UserApi(logger);
    const userUpdatePassword = new UserUpdatePassword(logger, userApi.path);
    const body = {
      id: userCreated.id,
      username: userCreated.username,
      password: "wrongpass",
      newPassword: "anypassword"
    }
    let response = await resetPasswordByEndpoint(userCreated.id, body);
    expect(response.code).to.be.equal(401);
  }).timeout(4000);

  it("should update user and devices password", async () => {
    const userApi = new UserApi(logger);
    const userUpdatePassword = new UserUpdatePassword(logger, userApi.path);
    const body = {
      id: userCreated.id,
      username: userCreated.username,
      password: defaultPassword,
      newPassword: "anypassword"
    }
    let response = await resetPasswordByEndpoint(userCreated.id, body);
    expect(response.data).to.be.true;
  }).timeout(4000);

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  });

});
