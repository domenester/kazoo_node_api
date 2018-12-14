// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import { login as errorMessages } from "../../../error/error-messages";
import Login from "./login";
import { userPasswordDefault, usernameDefault } from "../../../../mocks";
import { NODE_HOST, NODE_PORT } from "../../../../config/env";
import LoginApi from "../login.api";
import { ServiceTestApi } from "../../../../services/service-test.api";

export const loginByEndpoint = async (body: any) => {
  const loginApi = new LoginApi(logger);
  const login = new Login(logger, loginApi.path);
  const serviceTestApiInstance = new ServiceTestApi(login.fullPath);
  const response = await serviceTestApiInstance.request(
    login.method, body, {}, "Testing Login"
  );
  return response;
}

describe("Testing Login", async () => {

  before( async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should authenticate a valid user", async () => {
    const body = {
        password: userPasswordDefault,
        username: usernameDefault,
    };
    const response = await loginByEndpoint(body);
    expect(response).to.not.be.null;
  });

  it("should throw error for an invalid user", async () => {
    const body = { password: "lorem", username: "ipsum" };
    const response = await loginByEndpoint(body);
    expect(response.code).to.be.equal(401);
    expect(response.message).to.be.equal(errorMessages.unauthorized);
  });
});
