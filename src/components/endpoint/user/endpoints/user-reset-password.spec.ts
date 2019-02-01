// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import UserApi from "../user.api";
import { IUserNew } from "../../../../interfaces";
import { UserDeleteService } from "../../../../services/user/user-delete.service";
import UserResetPassword from "./user-reset-password";
import { createNewUser } from "../../../../services/user/user-new.service.spec";
import { userMock } from "../../../../services/user/mocks";
import { ServiceTestApi } from "../../../../services/service-test.api";
import * as jwt from "jsonwebtoken";

export const resetPasswordByEndpoint = async (body: any) => {
  const userApi = new UserApi(logger);
  const userResetPassword = new UserResetPassword(logger, userApi.path);
  const serviceTestApiInstance = new ServiceTestApi(`${userResetPassword.fullPath}`);
  const response = await serviceTestApiInstance.request(
    userResetPassword.method, body, {}, "Testing User Reset Password"
  );
  return response;
}

describe("Testing User Reset Password", async () => {

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
  }).timeout(10000);

  it("should update user and devices password", async () => {
    const token = jwt.sign(
      { email: userCreated.email }, process.env.JWT_SECRET, { expiresIn: 60 * 10 },
    );
    const body = {
      email: userCreated.email,
      newPassword: "anypassword",
      token
    }
    let response = await resetPasswordByEndpoint(body);
    expect(response.data).to.be.true;
  }).timeout(10000);

  it("should delete the user created", async () => {
    const response = await UserDeleteService(userCreated.id);
    expect(response.status).to.be.equal("success");
  }).timeout(8000);

});
