// tslint:disable:no-unused-expression

import { expect } from "chai";
import "mocha";
import * as request from "request-promise";
import {default as logger} from "../../../../components/logger/logger";
import server from "../../../../server";
import PasswordApi from "../password.api";
import { default as RequestPassword } from "./request-password";
import { usernameDefault } from "../../../../mocks";
import { NODE_HOST, NODE_PORT, PROTOCOL } from "../../../../config/env";
import { ServiceTestApi } from "../../../../services/service-test.api";

export const requestPasswordByEndpoint = async (body: any) => {
  const passwordApi = new PasswordApi(logger);
  const requestPassword = new RequestPassword(logger, passwordApi.path);
  const serviceTestApiInstance = new ServiceTestApi(`${requestPassword.fullPath}`);
  const response = await serviceTestApiInstance.request(
    requestPassword.method, body, {}, "Testing Request Password"
  );
  return response;
}

describe("Testing Request Password", async () => {

  it("Starting server...", async () => {
    await server.start();
  });

  after( () => {
    server.stop();
  });

  it("should throw error when email don't exist", async () => {
    const body = {
        email: "mockpass@gmail.com",
    };
    const response = await requestPasswordByEndpoint(body);
    expect(response.code).to.be.equal(400);
  });

  it.skip("should send email requesting password if email was found", async () => {
    const validEmail = usernameDefault;
    const body = {
        email: validEmail,
    };
    const response = await await requestPasswordByEndpoint(body);
    expect(response.data.envelope.to).to.be.equal(validEmail);
  }).timeout(5000);
});
